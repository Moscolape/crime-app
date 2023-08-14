import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Login from './components/login-component/login-component';
import PasswordReset from './components/reset-password-component/reset-password-component';
import SignUp from './components/signup-component/signup-component';


const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path="/reset-password" element={<PasswordReset/>} />
            <Route path="/sign-up" element={<SignUp/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;