import { useContext, useState } from "react";
import './UserPage.css'
import { UserContext } from "../UserContext";
// import {Navigate} from 'react-router-dom'
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export default function LoginPage(){
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [redirect, setRedirect]= useState(false);

    const {setUserInfo} = useContext(UserContext);

    async function login(ev){
        console.log("button clicked");
        ev.preventDefault();
        const response= await fetch(`/api/login`,{
            method:"POST",
            body: JSON.stringify({username, password}),
            headers: {"Content-Type": "application/json"},
        })
        if(response.ok){
            alert("login successful")
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
            })
            setRedirect(true);
        }else{
            alert("wrong credentials")
        }
    }
    if(redirect){
        return <Redirect to={'/profile'}/>
    }
    return(

    <div className="userpage">
        <h1>Login</h1>
        <form className="userform" onSubmit={login}>
            <input type="text" placeholder="username"
            value={username} 
            onChange={(ev)=>{
                setUsername(ev.target.value)
            }}/>
            <input type="password" 
            placeholder="password" 
            value={password} 
            onChange={(ev)=>{
                setPassword(ev.target.value)
            }}/>
            <button type="submit">Login</button>
        </form>
    </div>
    )
}