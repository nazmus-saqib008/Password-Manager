import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Form from './Components/Form';
import Profile from './Components/Profile';
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { UserContextprovider } from './UserContext';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';

function App() {
  return (
    <UserContextprovider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/'>
              <Navbar/>
              <Form/>
            </Route>
            <Route exact path='/profile'>
              <Profile/>
            </Route>
            <Route exact path='/login'>
              <LoginPage/>
            </Route>
            <Route exact path='/signup'>
              <RegisterPage/>
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContextprovider>
  );
}

export default App;
