import React from 'react'
import { Button, Form, Row, Col } from "react-bootstrap";
import "./Message.css";

function Message() {
    function handleSubmit(e) {
        e.preventDefault();

    }
    return (
    <>
        <div className='messages-output'> </div>
        <Form onSubmit={handleSubmit}>

            <Row> 
                <Col md={11}>
                    <Form.Group>
                        <Form.Control type="text" placeholder='Type message here'></Form.Control>
                    </Form.Group>
                </Col>
                <Col md={1}>
                    <Button variant='primary' type="submit" style={{ width: "100%", backgroundColor: "blue" }}>
                        <i className="fas fa-paper-plane"></i>
                    </Button>

                </Col>
            </Row>

        </Form>
    </>
    );

}

export default Message