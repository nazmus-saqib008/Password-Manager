import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import Item from './Item';
import Header from './Header';
import { UserContext } from '../UserContext';

export default function Profile() {

  const {userInfo}= useContext(UserContext);
  const [passwords, setPasswords]= useState([]);
  const [searchword, setSearchword]= useState("");

  useEffect(()=>{
    fetch(`/api/data`,{
      method: 'GET',
      headers: {"Content-Type": "application/json"},
    }).then(response=>{
      response.json().then(data=>{
        console.log(data);
        setPasswords(data);
      })
    })

  },[])

  function filterSearch() {
    console.log(searchword);
  }

  
  
  return (
    <>
      <Header/>
      <div id="searchbar">
        <h6>Saved Passwords: </h6>
        <input type="text" name="" value={searchword} onChange={(e)=>{setSearchword(e.target.value)}} id="searchWord" />
        <button onClick={filterSearch}>Search</button>
      </div>
      <div id='content-box'>
        <div id='content-header'>
          <p>
            <b>Title</b>
          </p>
          <p>
            <b>Password</b>
          </p>
          <div className='showButton'>
            
          </div>
        </div>
        {passwords.map((item)=>{
          return <Item password={item.pass} _id={item._id} title={item.title} note={item.note} key={item._id}/>
        })}
      </div>
    </>
  )
}
