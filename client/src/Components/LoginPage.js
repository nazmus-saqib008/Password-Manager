import { useContext, useState } from "react";
import './UserPage.css'
import { UserContext } from "../UserContext";
import { redirect, useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [redir, setRedir]= useState(false);
    const navigate= useNavigate();

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
            setRedir(true);
        }else{
            alert("wrong credentials")
        }
    }
    if(redir){
        navigate('/profile');
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
