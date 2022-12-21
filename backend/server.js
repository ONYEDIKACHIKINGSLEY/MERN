const express = require ('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const userRoutes = require('./routes/userRoutes')
const User = require('./models/User');
const rooms = ['general', 'software development', 'content creation', 'security', 'employability'];
const cors = require('cors');
const { Socket } = require('dgram');
const { Router } = require('express');
const Message = require('./models/Message');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


app.use('/users', userRoutes)

//connect server to frontend
const server = require('http').createServer(app);
const PORT = 4000;
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

app.get('/rooms', (req, res)=> {
    res.json(rooms)
})
//To send message from the joined room
async function getLastMessagesFromRoom(room){
    let roomMessages = await Message.aggregate([
        {$match: {to: room}},
        {$group: {_id: '$date', messagesByDate: {$push: '$$ROOT'}}}
    ])

    return roomMessages;

}

//Sort messages by date
function sortRoomMessagesByDate(messages) {
    return messages.sort(function(a, b){
        let date1 = a._id.split('/');
        let date2 = b ._id.split('/');

        date1 = date1[2] + date1[2] + date1[1]
        date2 = date2[2] + date2[2] + date2[1];

        return date1 < date2 ? -1 : 1
    })
}
 //socket connection
 io.on('connection', (socket)=> {

    socket.on('new-user', async ()=> {
        const members = await User.find();
        io.emit('new-user', members)
    })


    socket.on('join-room', async(newRoom, previousRoom)=> {
        socket.join(newRoom);
        socket.leave(previousRoom);
        let roomMessages = await getLastMessagesFromRoom(newRoom);

        //To get room messages
        roomMessages = sortRoomMessagesByDate(roomMessages);
        socket.emit('room-messages', roomMessages)

    })
    //To send messages
    socket.on('message-room', async(room, content, sender, time, date) => {
        console.log('new message', content);
        const newMessage = await Message.create({content, from: sender, time, date, to: room});
        let roomMessages = await  getLastMessagesFromRoom(room);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        //To send message to room
        io.to(room).emit('room-messages', roomMessages);
        socket.broadcast.emit('notifications', room)
    })
//logout
    app.delete('/logout', async(req, res) => {
        try {
            const {_id, newMessage} = req.body;
            const user = await User.findByID(_id);
            user.status = "offline";
            user.newMessages = newMessages;
            await user.save();
            const members = await User.find();
            socket.broadcast.emit('new-user', members);
            res.status(200).send();
        } catch (e) {
            console.log(e);
            res.status(400).send();
            
        }
    })
 })






mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to database!");
server.listen(PORT, ()=> {
    console.log('listening to port', PORT)
})
});


