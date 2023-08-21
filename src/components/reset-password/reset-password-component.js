import './reset-password-component.styles.css';
import resetImage from '../../assets/pwd-reset.png';

import { useState } from 'react';

const PasswordReset = () => {
    const [emailforrequest, setEmailForRequest] = useState('');


    const handleEmailForRequest = (event) => {
        setEmailForRequest(event.target.value)
    }


    const handleRequestPasswordToken = (event) => {
        event.preventDefault();

        const apiUrl = "https://crime-analysis-jno2.onrender.com";
        const endpoint = "/api/v1/auth/forgetpwd";
        const url = apiUrl + endpoint;

        const emailData = {
            email: emailforrequest
        };

        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emailData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Response:", data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }


    return (
        <main>
            <form onSubmit={handleRequestPasswordToken} className="form">
                <div className="spans">
                    <h1 className="mores">Reset Password!</h1>
                </div>
                <span>Enter the email address associated with your account and we'd send a password reset link.</span>
                <section className="inputBox">
                    <input type="email" name="email" onChange={handleEmailForRequest} value={emailforrequest} required />
                    <span>Email address</span>
                </section>
                <div>
                    <button type="submit" id="login">Request password reset link</button>
                </div>
            </form>
            <img src={resetImage} alt="login-pic" className="reset-pic" />
        </main>
    )
};

export default PasswordReset;