import React, {useRef, useEffect, useState} from 'react';
import Home from './Home';
import './SignInSignUp.css';

const SignInSignUp = () => {
    const name=useRef()
    const email=useRef()
    const password=useRef()
    const [showHome, setShowHome] = useState(false)
    const [showEmail, setShowEmail] = useState(false)

    const localSignUp= localStorage.getItem("signUp")
    const localEmail= localStorage.getItem("email")
    const localpassword = localStorage.getItem("password")
    const localName = localStorage.getItem("name")

    useEffect(()=> {
        if(localSignUp){
            setShowHome(true)
        }
        if(localEmail) {
            setShowEmail(true)
        }
    })
    const handleClick=()=> {
        if(name.current.value && email.current.value && password.current.value)
       {
        localStorage.setItem("name",name.current.value)
        localStorage.setItem("email",email.current.value)
        localStorage.setItem("password",password.current.value)
        localStorage.setItem("signUp",email.current.value)
        alert("Account created successfully")
        window.location.reload()
       }
    }

    const handleSignIn=()=> {
        if(email.current.value==localEmail && password.current.value==localpassword){
            localStorage.setItem("signUp",email.current.value)
            window.location.reload()
        } else {
            alert("Please Enter valid credential")
        }
    }

    return (
        <div>
            {showHome?<Home/>:
            (showEmail?
            <div className='container'>
                <h1>Hello {localName}</h1>
                <div className='input_space'>
                    <input placeholder='email' type='text' ref={email}/>
                </div>
                <div className='input_space'>
                    <input placeholder='password' type='password' ref={password}/>
                </div>
                <button onClick={handleSignIn}>sign up</button>
            </div>
            : 
            <div className='container'>
                <div className='input_space'>
                    <input placeholder='name' type='text' ref={name}/>
                </div>
                <div className='input_space'>
                    <input placeholder='email' type='text' ref={email}/>
                </div>
                <div className='input_space'>
                    <input placeholder='password' type='password' ref={password}/>
                </div>
                <button onClick={handleClick}>sign up</button>
            </div>)
            }
        </div>
    );
}

export default SignInSignUp;
