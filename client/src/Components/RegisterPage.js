import { useState } from "react";
import './UserPage.css'
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export default function RegisterPage(){

    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [redirect, setRedirect]= useState(false);

    async function register(ev){
        console.log("button clicked");
        ev.preventDefault();
        const response= await fetch(`/api/register`,{
            method:"POST",
            body: JSON.stringify({username, password}),
            headers: {"Content-Type": "application/json"},
        })
        if(response.status===200){
            setRedirect(true);
            alert("registration successful");
        }else{
            alert("registration failed");
        }
    }
    if(redirect){
        return <Redirect to={'/profile'}/>
    }
    return(
        <div className="userpage">
        <h1>Register</h1>
        <form className="userform" onSubmit={register}>
            <input type="text" 
            placeholder="username" 
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
            <button type="submit">Sign Up</button>
        </form>
    </div>
    )
}