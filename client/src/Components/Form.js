import React, { useState, useEffect, useContext } from 'react';
import './Form.css'
import { UserContext } from '../UserContext';
import {useCookies} from 'react-cookie'
import { Link,redirect, useNavigate } from 'react-router-dom';

function Form() {
    const [smallLetter, setSmallLetter] = useState("");
    const [capitalLetter, setCapitalLetter] = useState("");
    const [symbols, setSymbols] = useState("");
    const [numbers, setNumbers] = useState("");
    const [passLength, setPassLength] = useState(9);
    const [final, setFinal] = useState("");

    const [title, setTitle]= useState("");
    const [summary, setSummary]= useState("");

    const navigate= useNavigate();


    function smallLetterSet(){
        smallLetter===""?setSmallLetter("abcdefghijklmnopqrstuvwxyz"):setSmallLetter("");
    }
    function numbersSet(){
        numbers===""?setNumbers("0123456789"):setNumbers("");
    }
    function symbolSet(){
        symbols===""?setSymbols("!@#$%^&*-+_/=?"):setSymbols("");
    }
    function capitalSet(){
        capitalLetter===""?setCapitalLetter("ABCDEFGHIJKLMNOPQRSTUVWXYZ"):setCapitalLetter("");
    }
    function passLengthSet(){
        setPassLength(document.getElementById("passwordLength").value);
    }

    function basic(){
        let basic=smallLetter.charAt(Math.floor(25*Math.random()))+capitalLetter.charAt(Math.floor(25*Math.random()))+symbols.charAt(Math.floor(14*Math.random()))+numbers.charAt(Math.floor(9*Math.random()));
        return basic;
    }
    
    function GeneratePassword(){
        let shortPass= basic();
        let megaString=smallLetter+capitalLetter+symbols+numbers;
        let passWord="";
        for(let i=0; i<passLength-shortPass.length;i++){
            passWord+=megaString.charAt(Math.floor(megaString.length*Math.random()))
        }
        setFinal(shortPass+passWord);
    }

    const[cookies, setCookies]= useCookies();
    const {userInfo, setUserInfo}= useContext(UserContext);

    useEffect(()=>{
        if(cookies.token){
            fetch(`/api/profile`,{
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            }).then(response=>{
                response.json().then(info=>{
                setUserInfo(info);
                console.log(info);
                })
            })

        }
    },[])

    const [redir, setRedir]= useState(false);

    async function savePass(ev){
        ev.preventDefault();
        // const data= new FormData();
        // data.set('title', title);
        // data.set('note', summary);
        // data.set('pass',final);
        const data=JSON.stringify({"title": title, "note": summary, "pass": final});
        const response = await fetch(`/api/data`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: data,
        })
        // console.log(await response.json());
        if(response.ok){
            alert("Password Saved");
            setRedir(true);
        }

    }
    if(redir){
        // return redirect('/profile');
        navigate('/profile');
    }

    const user= userInfo?.username;
    return (
        <div className='req-form'>
            <div className="card border-primary mb-3 my-4 mx-5 text-start">
                <div className="card-header">Your Requirements</div>
                <div className="card-body text-primary">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="smallLetter" onChange={smallLetterSet} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Small Letters</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="number" onChange={numbersSet} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Numbers</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="symbol" onChange={symbolSet} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Symbols</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="capitalLetter" onChange={capitalSet}  />
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Capital Letters</label>
                    </div>
                    <hr />
                    <label htmlFor="customRange3" className="form-label fs-4">Length : &nbsp;
                        <span className="badge rounded-pill text-bg-primary">{passLength}</span></label>
                    <input type="range" className="form-range fs-4" min="6" max="12" step="1" id="passwordLength" onChange={passLengthSet} defaultValue="9" >
                    </input>
                </div>
            </div>
            <div>
                <button type="button" onClick={GeneratePassword} className="btn btn-warning">Generate</button>
                <form className='pass-form' onSubmit={savePass}>
                    <input type="text" className='form-inp' id='finPass' value={final} readOnly/>
                    <input type="text"
                        className='form-inp'
                        value={title}
                        placeholder='add title'
                        onChange={(ev)=>{
                            setTitle(ev.target.value)
                        }}/>
                    <textarea rows={5}
                        className='form-inp'
                        value={summary} 
                        placeholder='add note (if any)'
                        onChange={(ev)=>{
                            setSummary(ev.target.value)
                        }}/>
                    {/* {user && ( */}
                    {cookies.token && (
                        <button type='submit'>Save</button>

                    )}
                    {/* {!user && ( */}
                    {!cookies.token && (
                        <Link to={'/login'}>
                            Sign In First
                        </Link>
                        
                    )}
                </form>

            </div>
            <div>
                
            </div>
        </div>

    )
}

export default Form;
