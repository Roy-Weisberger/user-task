import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import {useNavigate} from 'react-router-dom';
import { db } from "../firebase"

export default function EditProfile() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const nameRef = useRef()
  const addressRef = useRef()
  const [error, setError] = useState("")
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  function getUserEditData() {
    const userData =   db.collection('users').doc(currentUser.uid)
    setLoading(true)
    userData.get()
    .then((snapshot) => {
      setName(snapshot.data().name);
      setAddress(snapshot.data().address)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error);
      setLoading(false)
    });
}


function setUserData(){
    const userData1 =   db.collection('users').doc(currentUser.uid)
    let updatedFields = {};
    updatedFields['name']=nameRef.current.value
    updatedFields['address']=addressRef.current.value
    console.log(updatedFields)
    userData1.update(updatedFields)
    .then(() => navigate('/profile'))
    .catch(setLoading(false))      
}

useEffect(() => {
    getUserEditData();
}, []);


  async function handleSubmit(e) {
    e.preventDefault()
    try {
        setError("")
        setLoading(true)
        setUserData();
    } catch {
      setError("Failed save changes")
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Edit Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} defaultValue= {name} required />
            </Form.Group>
            <Form.Group id="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" ref={addressRef} defaultValue={address} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
             Save changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
