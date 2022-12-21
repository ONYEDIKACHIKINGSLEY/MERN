import React, { useContext, useState } from 'react'
import { Button, Form, Row, Col } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import "./Message.css";

function MessageF() {
//send message
    const [message, setMessage] = useState("");
    const user = useSelector((state) => state.user);
    const {socket, currentRoom, messages, setMessages, privateMemberMsg } = useContext(AppContext);

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1+date.getMonth()).toString();

        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }
    function handleSubmit(e) {
        e.preventDefault();

    }

    const todayDate = getFormattedDate();
    socket.off('room-messages').on('room-messages', (roomMessages) => {
        console.log("room messages", roomMessages)
        setMessages(roomMessages)
    })

    function handleSubmit(e){
        e.preventDefault();
        if (!message) return;
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        const roomId = currentRoom;
        socket.emit("message-room", roomId, message, user, time, todayDate);
        setMessage("");

    }
    // To prevent non user to access chat
    return (
    <>
        <div className='messages-output'> 
        {!user && <div className='alert alert-danger'>Please signIn</div>}  

        {user &&   
         messages.map(({_id: date, messagesByDate}, idx) => (
            <div key={idx}>
                <p className='alert alert-info text-center message-date-indicator'>{date}</p>
                {messagesByDate?.map(({content, time, from: sender}, msgIdx) => (
                    <div className='message' key={msgIdx}>
                        <p>{content}</p>
                    </div>
                ))}
            </div>
        ))}
        </div>
        {user && (  
        <Form onSubmit={handleSubmit}>

            <Row> 
                <Col md={11}>
                    <Form.Group>
                        <Form.Control type="text" placeholder='Type message here' disabled={!user} value={message} onChange={(e) => setMessage(e.target.value)}></Form.Control> 
                    </Form.Group>
                </Col>
                <Col md={1}>
                    <Button variant='primary' type="submit"  style={{ width: "100%", backgroundColor: "blue" }} disabled={!user} >
                        <i className="fas fa-paper-plane"></i>
                    </Button>

                </Col>
            </Row>

        </Form>
        )}
    </>
    );

}

export default MessageF;