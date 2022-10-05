import React, { Component } from 'react'
import Mynav from './Navbar'
import MyCard from './MyCard'
import ProfProfileModal from './ProfProfileModal'
import Container from 'react-bootstrap/Container';

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