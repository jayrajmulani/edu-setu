import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
  
  function MyCard() {

    const rows=[
        {id:"1", name:"Dhrumil", prerequisite:"React, NodeJS", description:"SDE role", location:"Raleigh"},
    ];
    return (
      <Card style={{ width: '18rem' }}>
        <ListGroup variant="flush">
          <ListGroup.Item>Name: Dhrumil</ListGroup.Item>
          <ListGroup.Item>Prerequisite: NodeJS, React</ListGroup.Item>
          <ListGroup.Item>Description: SDE role</ListGroup.Item>
          <ListGroup.Item>Location: Raleigh</ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
  
  export default MyCard;
