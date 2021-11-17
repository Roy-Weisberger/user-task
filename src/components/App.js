import React from "react"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Profile from "./Profile"
import EditProfile from "./EditProfile"

function App() {

    return (
        <Container 
        className="d-flex align-items-center justify-content-center"
        style = {{minHeight: "100vh"}}
        >
        <div className="w-100"style={{ maxWidth: '400px'}}>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path='/login' element={<Login/>} />
                        <Route exact path='/' element={<Login/>} />
                        <Route path='/editprofile' element={<EditProfile/>} />
                        <Route path='/profile' element={<Profile/>} />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
        </Container>
    )
}

export default App;
