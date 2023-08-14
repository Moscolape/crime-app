import { Link } from "react-router-dom";
import React, { useState } from 'react';
import './login-component.styles.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };   
    
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };  


    const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = "https://crime-analysis-jno2.onrender.com";
    const endpoint = "/api/v1/auth/login";
    const url = apiUrl + endpoint;

    console.log(url);

    const token = "1ee95ab0f114571473f29265eb062e7a7b278d1e48db2c755b88ae18d6ea6974";

    const headers = {
        "Authorization": `Bearer ${token}`
    };

    // Sample login data
    const loginData = {
        email: email,
        password: password
    };

    console.log(loginData);

    // Make the POST request
    fetch(url, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Login Response:", data);
        // Clear email and password fields
        setEmail('');
        setPassword('');
    })
    .catch(error => {
        console.error("Error:", error);
    });
    }

    return (
        <>
            <main className="main">
                <section className="form-section">
                    <div className="login">
                        <span id="circle"></span>
                        <h3>CFAS Log-In</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="log">
                        <div>
                            <label htmlFor="email">Email Address:</label><br />
                            <input type="email" name="email" onChange={handleEmail} value={email} id="email" required />
                        </div>
                        <div>
                            <label htmlFor="pwd">Password:</label><br />
                            <input type="password" name="pwd" onChange={handlePassword} value={password} id="pwd" required />
                        </div>
                        <div className="reset">
                            <span>
                                <input type="checkbox" name="checkbox" id="checkbox" /> Remember me
                            </span>
                            <Link to="/reset-password" className="forget">
                                <span>Forgotten password?</span>
                            </Link>
                        </div>
                        <button type="submit" className="btn">Log In</button>
                    </form>
                    <p><span style={{color:'gray',fontSize: 13}}>Don't have an account?</span> <Link to="/sign-up" style={{color:'darkblue',fontSize: 13,textDecoration:'none'}}>Sign up</Link></p>
                </section>
                <section className="circle-section">
                    <h1>CFAS</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora modi sapiente vero facilis beatae animi quam debitis quas atque voluptates porro esse nulla ad aperiam.
                    </p>
                    <div className="learn">
                        <div className="span">
                            <span className="more">Learn More</span>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
};

export default Login;