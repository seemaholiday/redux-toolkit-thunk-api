import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserList, postUserList, deleteUserRecord, updateUserRecord } from './reducers/userListReducer';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import './App.css';
import Modalcom from './components/modalcom';


function App() {
  const userListData = useSelector((state) => state.userData.list)
  const userPostRes = useSelector((state) => state.userData.postRes)
  const userDeleteRes = useSelector((state) => state.userData.deleteRes)
  const userUpdateRes = useSelector((state) => state.userData.updateRes)
  const dispatch = useDispatch()
  const [data, setData] = useState({ name: '', email: '', designation: '', hobby: '' })
  const [editData, setEditData] = useState({name:'', designation:'', hobby:''})
  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(fetchUserList())
  }, [])
  const onSubmitEvent = async (e) => {
    e.preventDefault()
    console.log('final data', data)
    await dispatch(postUserList(data))
  }
  // Delete Event
  const deleteEvent = (item) => {
    dispatch(deleteUserRecord(item._id))
  }
  // Update Event
  const updateEvent=(item)=>{
    setShow(true)
    let obj = {id:item._id, name:item.name, designation:item.designation, hobby:item.hobby}
    setEditData(obj)
  }
  //Update Api Event
  const updateRecordApi=()=>{
    dispatch(updateUserRecord(editData))
    setShow(false)
  }

  // Response handle
  useEffect(() => {
    dispatch(fetchUserList())
  }, [userPostRes || userDeleteRes || userUpdateRes])


  const handleClose = () => setShow(false);


  return (
    <div className="App">
      {
        console.log('userListData', userListData)
      }
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Hobby</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              userListData.data ? userListData.data.map((item, index) => {
                return (
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.designation}</td>
                    <td>{item.hobby}</td>
                    <td><Button type='button' variant="danger" onClick={() => deleteEvent(item)}>Delete</Button>
                      <Button type='button' variant='primary' style={{ marginLeft: '10px' }} onClick={() => updateEvent(item)}>Update</Button>
                    </td>
                  </tr>
                )
              }) : ""
            }
          </tbody>
        </Table>
        {/* Form */}
        <Row className="justify-content-md-center">
          <h1>Add Record</h1>
          <Col md={{ span: 4, offset: 1 }} style={{ textAlign: 'left' }}>
            <Form onSubmit={onSubmitEvent}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setData({ ...data, name: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setData({ ...data, email: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDesignation">
                <Form.Label>Designation</Form.Label>
                <Form.Control type="text" placeholder="Enter Designation" onChange={(e) => setData({ ...data, designation: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicHobby">
                <Form.Label>Hobby</Form.Label>
                <Form.Control type="text" placeholder="Enter Hobby" onChange={(e) => setData({ ...data, hobby: e.target.value })} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Modalcom show={show} handleClose={handleClose} editData={editData} updateRecordApi={updateRecordApi} setEditData={setEditData}/>
    </div>
  );
}

export default App;
