import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Welcome from "./containers/Welcome";
import { Redirect } from "react-router-dom";

export default function Routes() {
  const [userLogged, setUserLogged] = useState()
  useEffect(() => {
    if(userLogged){
      localStorage.setItem("userdata", userLogged)
    }
    else{
      const data = localStorage.getItem("userdata")
      console.log('data is', data)
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/">
      {userLogged ? <Redirect to="/welcome" /> : <Login updateUserLogged={setUserLogged}/>}
      </Route>
      <Route exact path="/signup">
        <Register updateUserLogged={setUserLogged}/>
      </Route>
      <Route exact path="/login">
        {userLogged ? <Redirect to="/welcome" /> : <Login updateUserLogged={setUserLogged}/>}
      </Route>
      <Route exact path="/welcome">
        {userLogged ? <Welcome userLogged={userLogged} updateUserLogged={setUserLogged}/>: <Redirect to="/login" /> }
      </Route>
    </Switch>
  );
}