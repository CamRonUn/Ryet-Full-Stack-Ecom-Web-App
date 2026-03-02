import React from "react";
import {checklogin, postLogin, loginWithGoogle} from '../../../../Controller/users'
import { useEffect, useState, useRef } from "react";
import login from '../../assets/account/Sign In Banner.jpg'
import './account.css'
import { useNavigate } from "react-router-dom";
import Accountpage from "./accountPage";


function Account() {
    
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [loading, setloading] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginFail, setloginFail] = useState(false);
    const [, setUser] = useState(null)
    const Navigate = useNavigate()
    const passwordInputRef = useRef(null);

    useEffect(() => {
        const loadData = async () => {
            setloading(true); 
            try {
                const data = await checklogin()
                setisLoggedIn(data)               
            } catch (error) {
                console.error("Cant determin login status:", error);
            } finally {
                setloading(false)
            }
        }
        loadData()
    }, [] )


    const handleEmailKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the form from submitting
            passwordInputRef.current.focus(); // Corrected spelling: .focus()
        }
    };

    const handleUserName = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const userData = await postLogin(username, password);
        setUser(userData);
        if (userData.user){
            setisLoggedIn({user: true})
            setloginFail(false)
        } else {
            setloginFail(true)
        }
    }

    const handleGoogleLogin = (e) => {
        e.preventDefault()
        loginWithGoogle()
        console.log("google login attempt")
    }

    if (loading) {
        return (
            <div>

            </div>
        )
    }

    if (!isLoggedIn.user) {
        return (
            <>
                <div className="LoginPage">
                    <div className="loginPageBanner">
                        <img src={login} alt='banner'/>
                    </div>
                    <div className="loginForm">
                        <form onSubmit={handleLogin}>
                            <h2>Login</h2> 
                            <input type='text' value={username} onChange={handleUserName} onKeyDown={handleEmailKeyDown} placeholder="Email" />
                            <input type='password' value={password} onChange={handlePassword} placeholder="Password" ref={passwordInputRef} />
                            <button className="SignInButton" onClick={handleLogin} >Sign In</button>
                            <button className="SignUpnButton" onClick={() => Navigate('/register')} type='button'>Sign Up</button>
                            <button className="GoogleSingIn" onClick={handleGoogleLogin}>Sign In With Google</button>
                            <p className="failedLogin">{loginFail ? "Incorrect Credentials" : ""}</p>
                        </form>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="Account">
                    <Accountpage />
                </div>
            </>
        )
    }
}

export default Account