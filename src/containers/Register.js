import React, { useState } from "react";
import "./Home.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CheckIfPasswordsAreSame } from '../library/validation' 
export default function Register(props) {

  const { updateUserLogged } = props

  const [email, setEmail] = useState()
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()
  const [confirmedPassword, setConfirmedPassword] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [city, setCity] = useState()
  const [fullName, setFullName] = useState()
  const [error, setError] = useState()

  const handleChangeEmail = e => {
    setEmail(e.target.value)
  }
  const handleChangeUserName = e => {
    setUserName(e.target.value)
  }
  const handleChangePassword = e => {
    setPassword(e.target.value)
  }
  const handleChangeConfirmedPassword = e => {
    setConfirmedPassword(e.target.value)
  }
  const handleChangePhoneNumber = e => {
    setPhoneNumber(e.target.value)
  }
  const handleChangeCity = e => {
    setCity(e.target.value)
  }
  const handleChangeFullName = e => {
    setFullName(e.target.value)
  }
  const onRegister = () => {
    if(CheckIfPasswordsAreSame(password, confirmedPassword)){
      const body = {
        username: userName,
        email: email,
        password: password,
        confirm_password: confirmedPassword,
        phonenumber: phoneNumber,
        city: city,
        fullname: fullName
      }
      const formBody = Object.keys(body)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&'); 
      fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody
        }).then((resp) => resp.json()) // Transform the data into json
        .then((data) => {
          if(data.status){
            setError(data.error)
          }
          else if(data.token){
            updateUserLogged(data)
          }
          })
    }
    else{
      alert('no')
    }
  }

  return (
    <div className="Home">
      <div className="lander">
        <h1>Register</h1>
        <Form>
          <Form.Group>
          <Form.Label>Username</Form.Label>
            <Form.Control value={userName} onChange={handleChangeUserName}/>
          </Form.Group>
          <Form.Group>
          <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={handleChangeEmail}/>
          </Form.Group>
          <Form.Group>
          <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={handleChangePassword}/>
          </Form.Group>
          <Form.Group>
          <Form.Label>Confirmed Password</Form.Label>
            <Form.Control type="password" value={confirmedPassword} onChange={handleChangeConfirmedPassword}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>PhoneNumber</Form.Label>
            <Form.Control value={phoneNumber} onChange={handleChangePhoneNumber} />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control value={city} onChange={handleChangeCity} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control value={fullName} onChange={handleChangeFullName} />
            {error && <Form.Text id="passwordHelpBlock" muted>
              {error}
            </Form.Text>}
          </Form.Group>
          <Button variant="primary" onClick={onRegister}>
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}