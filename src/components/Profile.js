import React, { useState, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import {useNavigate} from 'react-router-dom';
import { db } from "../firebase"


export default function Profile() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const { currentUser } = useAuth()
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  function getUserData() {
      const userData =   db.collection('users').doc(currentUser.uid)
      setLoading(true)
      userData.get()
      .then((snapshot) => {
        setName(snapshot.data().name);
        setAddress(snapshot.data().address)
        setPassword(snapshot.data().password)
        setBirthDate(snapshot.data().birthdate.toDate().toString().substr(4, 12))
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      //await logout()
      navigate('/editprofile')
    } catch {
      setError("Failed to log out")
    }
    setLoading(false)
  }

  if (loading){
    return (
      <h4 className="text-center mb-4">Loading..</h4>
    )
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <h4>Name: {name}</h4>
          <h4>Email: {currentUser.email}</h4>
          <h4>Password: {password}</h4>
          <h4>Address: {address}</h4>
          <h4>BirthDate: {birthDate}</h4>
            <Button disabled={loading} className="w-100" type="submit">
              Edit Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}