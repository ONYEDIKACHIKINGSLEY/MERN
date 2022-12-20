import React from 'react'
import { Row, Col, Button} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';


function Home() {
  return <Row>
    <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
      <div>
        <h1>Welcome to ChatApp</h1>
        <p>The world in your palms</p>
        <LinkContainer to="/Login">
          <Button variant="success">Get Started<i className="fas fa-comments home-message-icon"></i>
          </Button>
          
        </LinkContainer>
      </div>
    </Col>
    <Col md={6} className="home__bg"></Col>
  </Row>;
  
}

export default Home