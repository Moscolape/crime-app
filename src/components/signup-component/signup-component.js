import React, { useState } from 'react';
import '../login-component/login-component.styles.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleName = (event) => {
        setName(event.target.value);
    };   

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };   
    
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };  

    const handleSubmit = (event) => {
        event.preventDefault();

        const apiUrl = "https://crime-analysis-jno2.onrender.com";
        const endpoint = "/api/v1/auth/register";
        const url = apiUrl + endpoint;

        console.log(url);

        // registration data
        const regData = {
            fullName: name,
            email: email,
            password: password
        };

        console.log(regData);

        // Make the POST request
        fetch(url, {
            method: "POST",
            body: JSON.stringify(regData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Sign-up Response:", data);
            // Clear name, email and password fields
            setName('');
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
                        <h3>CFAS Sign-Up</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="log">
                        <div>
                            <label htmlFor="email">Fullname:</label><br />
                            <input type="text" name="fname" onChange={handleName} value={name} id="name" required />
                        </div>
                        <div>
                            <label htmlFor="email">Email Address:</label><br />
                            <input type="email" name="email" onChange={handleEmail} value={email} id="email" required />
                        </div>
                        <div>
                            <label htmlFor="pwd">Password:</label><br />
                            <input type="password" name="pwd" onChange={handlePassword} value={password} id="pwd" required />
                        </div>
                        <button type="submit" className="btn">Sign Up</button>
                    </form>
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