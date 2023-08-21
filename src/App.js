import React, { useState } from 'react';
import TokenContext from '../src/contexts/token-context';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from "react";

import './App.css';
import Spinner from './components/spinner/spinner-component';

const Login = lazy(() => import("./components/login/login-component"));
const PasswordReset = lazy(() => import("./components/reset-password/reset-password-component"));
const SignUp = lazy(() => import("./components/signup/signup-component"));
const Dashboard = lazy(() => import("./components/my-dashboard/my-dashboard-component"));


const App = () => {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <Suspense fallback={<Spinner/>}>
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
      </Suspense>
    </TokenContext.Provider>
  );
}

export default App;