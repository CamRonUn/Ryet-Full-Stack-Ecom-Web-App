import React from "react";
import {checklogin, PostSignUP} from '../../../../Controller/users'
import { useEffect, useState, useRef } from "react";
import Singup from '../../assets/account/SignUp Banner.jpg'
import './account.css'
import { useNavigate } from "react-router-dom";


function Register() {
    
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [loading, setloading] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [user, setUser] = useState(null)
    const Navigate = useNavigate()
    const passwordInputRef = useRef(null);
    const fNameRef = useRef(null);
    const LnameRef = useRef(null);
    const phoneRef = useRef(null);
    const dobRef = useRef(null);
    const [signUpFail, setsignUpFail] = useState(false);
    const [signuperror, setsignuperror] = useState("")

    useEffect(() => {
        const loadData = async () => {
            setloading(true); 
            try {
                const data = await checklogin()
                console.log(data)
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

    const handlePasswordDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the form from submitting
            fNameRef.current.focus(); // Corrected spelling: .focus()
        }
    };

    const handleFirstNameKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the form from submitting
            LnameRef.current.focus(); // Corrected spelling: .focus()
        }
    };

    const handleLastNameKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the form from submitting
            phoneRef.current.focus(); // Corrected spelling: .focus()
        }
    };

    const handlePhoneKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the form from submitting
            dobRef.current.focus(); // Corrected spelling: .focus()
        }
    };

    //first_name, last_name, phone, DOB 
    const handleUserName = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
    }

    const handlePhone =(e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        setPhone(numericValue);
    }

    const displayPhone = phone ? `+${phone}` : '';

    const handleDOB = (e) => {
        setDob(e.target.value);        
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        const userData = await PostSignUP(username, password, firstName, lastName, displayPhone, dob);
        console.log(userData)
        if (userData.user){
            setUser(userData);
            setisLoggedIn({user: true})
            setsignUpFail(false)
            console.log(isLoggedIn)
            console.log(user)
        } else {
            console.log("tests")
            setsignUpFail(true)
            setsignuperror(userData.message)
        }
    }

    if (loading) {
        return (
            <div>

            </div>
        )
    }

    if (isLoggedIn.user) {
        Navigate('/account')
    }
 
    if (!isLoggedIn.user) {
        return (
            <>
                <div className="LoginPage">
                    <div className="loginPageBanner">
                        <img src={Singup} alt='banner'/>
                    </div>
                    <div className="loginForm">
                        <form onSubmit={handleSignUp}>
                            <h2>Sign Up</h2> 
                            <input type='text' value={username} onChange={handleUserName} onKeyDown={handleEmailKeyDown} placeholder="Email" />
                            <input type='password' value={password} onChange={handlePassword} onKeyDown={handlePasswordDown} placeholder="Password" ref={passwordInputRef} />
                            <input type='text' value={firstName} onChange={handleFirstName} onKeyDown={handleFirstNameKeyDown} ref={fNameRef} placeholder="First Name" />
                            <input type='text' value={lastName} onChange={handleLastName} onKeyDown={handleLastNameKeyDown} ref={LnameRef} placeholder="Last Name" />
                            <input type='text' value={displayPhone} onChange={handlePhone} onKeyDown={handlePhoneKeyDown} ref={phoneRef} placeholder="Phone" />
                            <input type='date' value={dob} onChange={handleDOB} ref={dobRef} placeholder="DOB" />
                            <button className="SignInButton" onClick={handleSignUp} >Register</button>
                            <button className="SignUpnButton" onClick={() => Navigate('/account')} type='button'>Sign in</button>
                            <button className="google-login-btn">
                                <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google logo"/>
                                <span>Sign Up with Google</span>
                            </button>
                            <p className="failedLogin">{signUpFail ? signuperror : ""}</p>
                        </form>
                    </div>
                </div>
            </>
        )
    };
};
export default Register

