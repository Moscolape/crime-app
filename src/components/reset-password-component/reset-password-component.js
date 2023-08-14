import './reset-password.styles.css';
import resetImage from '../../assets/pwd-reset.png';

const PasswordReset = () => {
    return (
        <main>
            <form action="" className="form">
                <div className="spans">
                    <h1 className="mores">Reset Password!</h1>
                </div>
                <span>Enter the email address associated with your account and we'd send a password reset link.</span>
                <section className="inputBox">
                    <input type="email" name="email" required />
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