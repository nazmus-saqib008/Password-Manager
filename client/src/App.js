import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Form from './Components/Form';
import Profile from './Components/Profile';
import React, { Component } from 'react'
import {
  Route,
  Link,
  Routes,
  BrowserRouter
} from "react-router-dom";
import { UserContextprovider } from './UserContext';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';

function App() {
  return (
    <UserContextprovider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path={'/'} element={<><Navbar/><Form/></>}/>
            <Route exact path={'/profile'} element={<Profile/>}/>
            <Route exact path={'/login'} element={<LoginPage/>}/>
            <Route exact path={'/signup'} element={<RegisterPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </UserContextprovider>
  );
}

export default App;
