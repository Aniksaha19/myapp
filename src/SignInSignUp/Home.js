import React from 'react';
import './SignInSignUp.css';

    const logout =()=> {
        localStorage.removeItem("signUp")
        window.location.reload()
    }
    const deleteAccount =()=> {
        localStorage.clear()
        window.location.reload()
    }

const Home = () => {
    return (
        <div>
            <header>
             <h1>Home Page</h1>
            </header>
            
            <button onClick={logout} className='logout'>Logout</button>
            <button onClick={deleteAccount} className='delete'>Delete</button>
        </div>
    );
}

export default Home;
