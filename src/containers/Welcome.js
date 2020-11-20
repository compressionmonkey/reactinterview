import React, { useState } from "react";
import "./Home.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Welcome(props) {
  const { userLogged, updateUserLogged } = props
  const [city, setCity] = useState(userLogged.city)
  const [phonenumber, setPhoneNumber] = useState(userLogged.phonenumber)
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState()

  const onEditing = () => {
    if(disabled === false){
    const body = {city: city, phonenumber: phonenumber}
    const formBody = Object.keys(body)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&'); 
    fetch('http://localhost:4000/profile', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${userLogged.token}`
    },
    body: formBody
      }).then((resp) => resp.json()) // Transform the data into json
      .then((data) => {
        if(data.statusCode){
          setError(data.message)
        }
        else if(data.fullname){
          updateUserLogged(data)
        }
        })
    }
    setDisabled(!disabled)
  }

  const handleChangeCity = (e) => {
    setCity(e.target.value)
  }
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }
  return (
    <div className="Home">
      <div className="lander">
        <h1>Welcome { userLogged.fullname }!</h1>
        <p className="text-muted">Here are your details:</p>
        <Form>
          <Form.Group>
          <Form.Label>City</Form.Label>
            <Form.Control disabled={disabled} type="email" value={city} onChange={handleChangeCity}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>PhoneNumber</Form.Label>
            <Form.Control disabled={disabled} value={phonenumber} onChange={handleChangePhoneNumber} />
          </Form.Group>
          <Button variant="primary" onClick={onEditing}>
            {disabled ? "Edit" : "Save"}
          </Button>
          {error}
        </Form>
        <Button onClick={() => updateUserLogged()}>Log Out</Button>
      </div>
    </div>
  );
}