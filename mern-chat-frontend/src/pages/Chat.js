import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from '../components/Sidebar';
import Message from '../components/MessageF';

function Chat() {
    return (
    < Container >
        <Row>
            <Col md={4}>
                <Sidebar />
            </Col>
            <Col md={8}>
                <Message />
            </Col>
        </Row>
  </Container >
    )
}


export default Chat