import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function Modalcom(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Update User Data</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={props.editData.name} placeholder="Enter Name" onChange={(e) => props.setEditData({ ...props.editData, name: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDesignation">
          <Form.Label>Designation</Form.Label>
          <Form.Control type="text" value={props.editData.designation} placeholder="Enter Designation" onChange={(e) => props.setEditData({ ...props.editData, designation: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicHobby">
          <Form.Label>Hobby</Form.Label>
          <Form.Control type="text" value={props.editData.hobby} placeholder="Enter Hobby" onChange={(e) => props.setEditData({ ...props.editData, hobby: e.target.value })} />
        </Form.Group>
      
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={()=>props.updateRecordApi()}>
        Update Record
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default Modalcom