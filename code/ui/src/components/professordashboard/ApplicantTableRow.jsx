import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

const ApplicantTableRow = ({data}) => {
    return (
      data.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.prerequisite}</td>
              <td>{item.prerequisite}</td>
              <td>{item.location}</td>
              <td>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Actions
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Edit Posting</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Delete Posting</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Toggle</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </td>
            </tr>    
          ))
      )
        
}

export default ApplicantTableRow