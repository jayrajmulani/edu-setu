import React, { Component } from 'react'
import Mynav from './Navbar'
import MyCard from './MyCard'
import ProfProfileModal from './ProfProfileModal'
import Container from 'react-bootstrap/Container';

const rows=[
  {id:"1", name:"Dhrumil", prerequisite:"React, NodeJS", description:"SDE role", location:"Raleigh"},
];

export class ProfProfile extends Component {
  render() {
    return (
          <>
            <Mynav />
            <br />
            <Container>
              <ProfProfileModal data="rows"/>
              <br/>

              <MyCard />
            </Container>
          </>
      )
  }
}

export default ProfProfile