import React, { useState } from 'react';
import '../login/login-component.styles.css';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleName = (event) => {
        setName(event.target.value);
    };   

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };   
        
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError('');

        try {
            const apiUrl = "https://crime-analysis-jno2.onrender.com";
            const endpoint = "/api/v1/auth/register";
            const url = apiUrl + endpoint;

            console.log(url);

            // Registration data
            const regData = {
                fullName: name,
                email: email,
                password: password
            };

            console.log(regData);

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(regData),
                headers: {
                "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || `Request failed with status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Sign-up Response:", data);

            // Clear name, email, and password fields
                setName('');
                setEmail('');
                setPassword('');
        }catch (error) {
            setError(error.message || "An error occurred");
        }finally {
            setLoading(false);
        }
    }

    return (
        <>
            <main className="main">
                <section className="form-section">
                    <div className="login">
                        <span id="circle"></span>
                        <h3>CFAS Sign Up</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="log">
                        <div>
                            <label htmlFor="name">Fullname:</label><br />
                            <input type="text" name="name" onChange={handleName} value={name} id="name" required />
                        </div>
                        <div>
                            <label htmlFor="email">Email Address:</label><br />
                            <input type="email" name="email" onChange={handleEmail} value={email} id="email" required />
                        </div>
                        <div style={{position:'relative'}}>
                            <label htmlFor="password">Password:</label><br />
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                name="pwd"
                                onChange={handlePassword}
                                value={password}
                                id="pwd"
                                required
                            />
                            <FontAwesomeIcon
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                icon={passwordVisible ? faEyeSlash : faEye}
                                className="eye-icon"
                            />
                        </div>
                        <button type="submit" className="btn" disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                    <p><span style={{color:'gray',fontSize: 13}}>Already have an account?</span> <Link to="/" style={{color:'darkblue',fontSize: 13,textDecoration:'none'}}>Log in</Link></p>
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

export default SignUp;