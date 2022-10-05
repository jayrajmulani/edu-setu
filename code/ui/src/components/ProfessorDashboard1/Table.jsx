import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';

const rows=[
    {id:"1", name:"Dhrumil", prerequisite:"React, NodeJS", description:"SDE role", location:"Raleigh"},
    {id:"1", name:"Khrumil", prerequisite:"React, NodeJS", description:"SDE role", location:"Raleigh"},
    {id:"1", name:"KAumil", prerequisite:"React, NodeJS", description:"SDE role", location:"Raleigh"},
    {id:"1", name:"Mhrumil", prerequisite:"React, NodeJS", description:"SDE role", location:"Raleigh"},
    {id:"1", name:"Nrumil", prerequisite:"React, NodeJS", description:"SDE role", location:"Raleigh"},
    {id:"1", name:"Dhrumil", prerequisite:"React, NodeJS", description:"SDE role", location:"Raleigh"}
];
function Tables() {
    const [query,setQuery] = useState("");
    const search = (rows) => {
        // console.log(query)
        // console.log(rows);
        console.log(rows.filter((item)=> item.name.toLowerCase().includes(query)));
        return rows.filter((item)=> item.name.toLowerCase().includes(query));
    }
  return (
    <Container>
        <label>
            Search by Name :
            <input type="text"  className="search" placeholder="Search.. by Name" onChange={(e)=>setQuery(e.target.value)}/>
        </label>
        <Table striped>
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Prerequisite</th>
            <th>Description</th>
            <th>Location</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <TableRow data={search(rows)} /> 
        </tbody>
        </Table>
    </Container>

  );
}
// id={row.id} name={row.name} prerequisite={row.prerequisite} description=
export default Tables;