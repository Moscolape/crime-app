import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

import TokenContext from '../../contexts/token-context';

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

    const { setToken } = useContext(TokenContext);


    const handleEmail = (event) => {
        setEmail(event.target.value);
    };   
    
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };  

    // useEffect(() => {
    //     AOS.init({
    //         delay: 200,
    //         duration: 1500,
    //         once: false,
    //         mirror: false, 
    //     });
    //     return () => {
    //       AOS.refreshHard();
    //     };
    // }, []);


    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true);
        setError('');

        const apiUrl = "https://crime-analysis-jno2.onrender.com";
        const endpoint = "/api/v1/auth/login";
        const url = apiUrl + endpoint;

        console.log(url);

        // Sample login data
        const loginData = {
            email: email,
            password: password
        };

        // console.log(loginData);

        // Make the POST request
        fetch(url, {
            method: "POST",
            headers: {
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
            // console.log("Login Response:", data);
            // console.log("User Token:", data.token);

            // Get the user's token
            const token = data.token;
            setToken(token);

            if(data.msg.includes('granted')) {
                setModalIsOpen(true);

                // Route to dashboard page after 5 seconds
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
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
                    <div className="login" 
                    data-aos="zoom-out" 
                    data-aos-duration="1000">
                        <span id="circle"></span>
                        <h3>CFAS Log-In</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="log">
                        <div data-aos="fade-left" data-aos-duration="1500">
                            <label htmlFor="email">Email Address:</label><br />
                            <input type="email" name="email" onChange={handleEmail} value={email} id="email" required />
                        </div>
                        <div style={{position: 'relative'}} data-aos="fade-left" data-aos-duration="1500">
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
                        <div className="reset" data-aos="fade-left" data-aos-duration="1500">
                            <span>
                                <input type="checkbox" name="checkbox" id="checkbox" /> Remember me
                            </span>
                            <Link to="/reset-password" className="forget">
                                <span>Forgotten password?</span>
                            </Link>
                        </div>
                        <button type="submit" className="btn" disabled={loading} data-aos="fade-left" data-aos-duration="1500">
                            {loading ? "Logging In..." : "Log In"}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                    {/* <p><span style={{color:'gray',fontSize: 13}}>Don't have an account?</span> <Link to="/sign-up" style={{color:'darkblue',fontSize: 13,textDecoration:'none'}}>Sign up</Link></p> */}
                </section>
                <section className="circle-section">
                    <h1 data-aos="fade-up" data-aos-duration="1000">CFAS</h1>
                    <p data-aos="fade-right" data-aos-duration="2000">
                        CFAS is a crime forecasting and analysis system built to aid security agencies in carrying out their responsibilities in a more timely manner to enhance security. It uses an AI prediction algorithm based on crime datasets of past criminal activities.
                    </p>
                    <div className="learn" data-aos="fade-down" data-aos-duration="1500">
                        <div className="span">
                            <span className="more">⇐ Log in to learn more</span>
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
                        top: '40%',
                        // width: '80%',
                        bottom: '40%',
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
                    <p>You have been successfully logged in!! You'd be redirected to your dashboard page shortly...</p>
                    {/* <button onClick={() => setModalIsOpen(false)} className="modal-btn">Ok</button> */}
                </div>
            </Modal>
        </>
    )
};

export default Login;