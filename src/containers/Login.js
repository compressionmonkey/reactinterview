import React, { useState } from "react";
import "./Home.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login(props) {
  const { updateUserLogged } = props
  const [user, setUser] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()

  const handleEmailChange = (e) => {
    setUser(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const submit = () => {
    const body = {username: user, password: password}
    const formBody = Object.keys(body)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&'); 
    fetch('http://localhost:4000/login', {
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
          // return <Redirect to="/welcome" />
        }
        })
  }

  return (
    <div className="Home">
      <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" values ={user} onChange={handleEmailChange} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" values ={password} onChange={handlePasswordChange} />
        {error && <Form.Text id="passwordHelpBlock" muted>
          {error}
        </Form.Text>}
      </Form.Group>
      <Button variant="primary" onClick={submit}>
        Log in
      </Button>
    </Form>
    </div>
  );
}