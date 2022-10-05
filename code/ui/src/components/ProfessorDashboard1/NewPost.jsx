import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';


function Post() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
              <Button variant="primary" onClick={handleShow}>
        + New Posting
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
            <form >
            <label>
            ID:
            <input type="text" />
            </label>
            <br />
            <label>
            Name:
            <input type="text" />
            </label>
            <br />
            <label>
            Prerequisites:
            <input type="text" />
            </label>
            <label>
                Description
            <input type="text" />
            </label>
            <br />
            <select>
                <option selected value="grapefruit">Select Location</option>
                <option value="lime">New York</option>
                <option value="coconut">San Francisco</option>
                <option value="mango">Boston</option>
            </select>
        </form>   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
export default Post;