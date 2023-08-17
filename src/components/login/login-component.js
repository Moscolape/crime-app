import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import Modal from 'react-modal';
import './login-component.styles.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();


    const handleEmail = (event) => {
        setEmail(event.target.value);
    };   
    
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };  


    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true);
        setError('');

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
                setLoading(false);
                throw new Error(`Request failed with status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Login Response:", data);
            if(data.msg.includes('granted')) {
                setModalIsOpen(true);
                // Route to reset page after 5 seconds
                setTimeout(() => {
                    navigate('/my-dashboard');
                }, 5000);
            }
            // Clear email and password fields
            setEmail('');
            setPassword('');
            setLoading(false);
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
                        <div style={{position: 'relative'}}>
                            <label htmlFor="pwd">Password:</label><br />
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
                        <div className="reset">
                            <span>
                                <input type="checkbox" name="checkbox" id="checkbox" /> Remember me
                            </span>
                            <Link to="/reset-password" className="forget">
                                <span>Forgotten password?</span>
                            </Link>
                        </div>
                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? "Logging In..." : "Log In"}
                        </button>
                        {error && <p className="error-message">{error}</p>}
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
            <Modal
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)'
                    },
                    content: {
                        position: 'absolute',
                        top: '35%',
                        // width: '80%',
                        bottom: '35%',
                        left: '5%',
                        right: '5%',
                        // height: '15%',
                        fontSize: '12px',
                        margin: 'auto',
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        // padding: '20px'
                        }
                }}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Login Success Modal"
                ariaHideApp={false}
            >
                <div className="modal-content">
                    <p>You have been successfully logged in!! You'd be redirected to your dashboard page in a short moment...</p>
                    {/* <button onClick={() => setModalIsOpen(false)} className="modal-btn">Ok</button> */}
                </div>
            </Modal>
        </>
    )
};

export default Login;