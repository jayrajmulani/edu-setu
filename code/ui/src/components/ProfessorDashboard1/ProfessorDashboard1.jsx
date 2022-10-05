import React, { Component } from 'react'
import MyNav from './Navbar'
import Post from './NewPost'
import Tables from './Table'

export class ProfessorDashboard extends Component {
  render() {
    return (
        <>
          <MyNav />
          <Post />
          <Tables />
        </>
      )
  }
}

export default ProfessorDashboard;