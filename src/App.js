import React, { useState, useEffect, useContext } from 'react';
import TokenContext from '../src/contexts/token-context';
import { CrimesProvider } from './contexts/crime-data-context';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';

import './App.css';
import Spinner from './components/spinner/spinner-component';


const Login = lazy(() => import("./components/login/login-component"));
const PasswordReset = lazy(() => import("./components/reset-password/reset-password-component"));
const SignUp = lazy(() => import("./components/signup/signup-component"));
const DashboardVisuals = lazy(() => import("./pages/dashboard-visuals/dashboard-visuals"));
const ContextAnalysis = lazy(() => import("./pages/context-analysis/context-analysis"));


const App = () => {
  const storedToken = sessionStorage.getItem('store-token');
  const [token, setToken] = useState(storedToken);

  useEffect(() => {
    AOS.init({
        delay: 200,
        duration: 1500,
        once: false,
        mirror: false, 
    });
}, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('store-token', token);
    } else {
      sessionStorage.removeItem('store-token');
    }
  }, [token]);

  const PrivateRoute = ({ element }) => {
    const { token } = useContext(TokenContext);
    return token ? element : <Navigate to="/" />;
  };

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <CrimesProvider>
      <Suspense fallback={<Spinner/>}>
        <Router>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route
                path="/reset-password"
                element={<PrivateRoute path="/reset-password" element={<PasswordReset />} />}
              />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={<PrivateRoute path="/dashboard" element={<DashboardVisuals />} />}
              />
              <Route
                path="/context-analysis"
                element={<PrivateRoute path="/context-analysis" element={<ContextAnalysis />} />}
              />
            </Routes>
          </div>
        </Router>
      </Suspense>
      </CrimesProvider>
    </TokenContext.Provider>
  );
}

export default App;