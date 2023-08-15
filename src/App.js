import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Login from './components/login-component/login-component';
import PasswordReset from './components/reset-password-component/reset-password-component';
import SignUp from './components/signup-component/signup-component';
import Dashboard from './components/my-dashboard-component/my-dashboard-component';


const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path="/reset-password" element={<PasswordReset/>} />
            <Route path="/sign-up" element={<SignUp/>} />
            <Route path="/my-dashboard" element={<Dashboard/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;