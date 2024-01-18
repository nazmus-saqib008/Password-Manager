import {
    Link
} from "react-router-dom";
import { UserContext } from '../UserContext';
import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import {useCookies} from 'react-cookie'

export default function Header(){
    const [cookies, setCookies]= useCookies();

    const {userInfo, setUserInfo}= useContext(UserContext);
    useEffect(()=>{
      
      if(cookies){
        fetch(`/api/profile`,{
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        }).then(response=>{
            response.json().then(info=>{
            setUserInfo(info);
            // console.log(info);
            })
        })
      }
    },[])

    function logout(ev){
        fetch(`/api/logout`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
        })
        setUserInfo();
        // console.log(userInfo);
    }
    const [username, setUsername]= useState();
    useEffect(()=>{

        // const username= userInfo?.username;
        setUsername(userInfo?.username);
        // console.log(userInfo);
    },[logout, userInfo])
    return(
        <div id="profile">
          {/* <button id='back'> */}
          <Link id='back' to='/'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>
          </Link>
          {username && (
            <>
              <div className="username">
                {username}
              </div>
              <button className='log' onClick={logout}>
                Log Out
              </button>
            </>
          )}
          {!username && (
            <>
              <div className='username'>
                Sign In
              </div>
              <Link className='log' to="/login">
                Log In
              </Link>
              <Link className='log' to="/signup">
                Register
              </Link>
            </>
          )}
        </div>
    )
}