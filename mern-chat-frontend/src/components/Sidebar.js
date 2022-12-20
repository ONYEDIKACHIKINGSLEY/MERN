import React from 'react'
import {ListGroup } from "react-bootstrap";
import { useSelector } from 'react-redux';
// import {useSelector} from "react-redux"////////////////////////////////////////

function Sidebar() {
    const rooms = ['Software Development', 'Content Creation', 'Employability']
    // const user = useSelector(state => state.user)/////////////////////////////////
    // if(!user) {
    //     return <></>///////////////////////////
    // }///////////////////////////////

 return ( <>
    <h2>Available Rooms</h2>
    <ListGroup>
        {rooms.map((room, idx) => (
            <ListGroup.Item key={idx}>{room}</ListGroup.Item>
        ))}

    </ListGroup>
    <h2>Members</h2>
    </>
 );
  
}

export default Sidebar;