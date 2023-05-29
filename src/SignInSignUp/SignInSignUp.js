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
        if(name.current.value && email.current.value && password.current.value) {
            fetch('/signup', {
                method: 'POST',
                body:JSON.stringify({
                    name:name.current.value,
                    email:email.current.value,
                    password:password.current.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                const csrfToken = response.headers.get('csrf-token');

                const jwtToken = response.headers.get('jwt-token');

                localStorage.setItem('name', name.current.value);
                localStorage.setItem('email', email.current.value);
                localStorage.setItem('password', password.current.value);
                localStorage.setItem('signUp', email.current.value);
                localStorage.setItem('csrfToken', csrfToken);
                localStorage.setItem('jwtToken', jwtToken);

                alert('Account created successfully');
                window.location.reload();
            })
            .catch((error)=> {
                console.error('Error:', error);
            });
        }   
    }

    const handleSignIn=()=> {
        if(email.current.value==localEmail && password.current.value==localpassword){
            fetch('/signin', {
                method: 'POST',
                body: JSON.stringify({
                    email: email.current.value,
                    password: password.current.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response)=> {
                const csrfToken = response.headers.get('csrf-token');
                const jwtToken = response.headers.get('jwt-token');

                localStorage.setItem("signUp",email.current.value);
                localStorage.setItem("csrfToken", csrfToken);
                localStorage.setItem("jwtToken", jwtToken);

                window.location.reload()
            })
            .catch((error)=> {
                console.log('Error', error)
            });         
        } else {
            alert("Please Enter valid credential")
        }
    };

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
                <button onClick={handleSignIn}>Sign In</button>
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
                <button onClick={handleClick}>Sign Up</button>
            </div>)
            }
        </div>
    );
}

export default SignInSignUp;
