const express = require ('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const userRoutes = require('./routes/userRoutes')


const rooms = ['general', 'tech', 'finance', 'crypto'];
const cors = require('cors');
const { Socket } = require('dgram');
const { Router } = require('express');

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

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to database!");
server.listen(PORT, ()=> {
    console.log('listening to port', PORT)
})
});


