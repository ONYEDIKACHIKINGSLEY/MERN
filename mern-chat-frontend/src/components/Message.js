import React from 'react'
import { Button, Form, Row, Col } from "react-bootstrap";
import { useSelector } from 'react-redux';
import "./Message.css";

function Message() {
    function handleSubmit(e) {
        e.preventDefault();

    }

    // To prevent non user to access chat
    const user = useSelector((state) => state.user);
    return (
    <>
        <div className='messages-output'> 
        {!user && <div className='alert alert-danger'>Please signIn</div>}  
        </div>
        {user && (
        <Form onSubmit={handleSubmit}>

            <Row> 
                <Col md={11}>
                    <Form.Group>
                        <Form.Control type="text" placeholder='Type message here' disabled={!user}></Form.Control>
                    </Form.Group>
                </Col>
                <Col md={1}>
                    <Button variant='primary' type="submit" style={{ width: "100%", backgroundColor: "blue" }} disabled={!user}>
                        <i className="fas fa-paper-plane"></i>
                    </Button>

                </Col>
            </Row>

        </Form>
        )}
    </>
    );

}

export default Message