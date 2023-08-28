import React, { useEffect, useState, useContext } from 'react';
import './my-dashboard-component.styles.css';


import { useNavigate } from 'react-router-dom';

import TokenContext from '../../contexts/token-context';

import SideBar from '../sidebar/sidebar-component';
import CrimeEvents from '../crime-events/crime-events-component';
import CrimeChart from '../crime-bar-chart/crime-barchart.component';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    // const [allusers, setAllUsers] = useState(null);

    const [crimes, setCrimes] = useState(null);
    const [crimesloading, setCrimesLoading] = useState(false);

    const { token } = useContext(TokenContext);

    // const [userloading, setUserLoading] = useState(false);

    const navigate = useNavigate();

    // Load user data from localStorage on component mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }

        // Fetch user data and update localStorage when token changes
        if (token) {
            const apiUrl = "https://crime-analysis-jno2.onrender.com";
            const endpoint = "/api/v1/auth/me";
            const url = apiUrl + endpoint;

            fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("User Data:", data);
                setUser(data);
                console.log(token);
                
                // Store user data and token in localStorage
                localStorage.setItem('user', JSON.stringify(data)); 
                localStorage.setItem('store-token', token);
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }
    }, [token]);

    // Load crime data from localStorage on component mount
    useEffect(() => {
        setCrimesLoading(true);

        const storeCrimes = JSON.parse(localStorage.getItem('crime-types'));

        if (storeCrimes) {
            setCrimesLoading(false);
            setCrimes(storeCrimes);
        } else {
            const apiUrl = "https://crime-analysis-jno2.onrender.com";
            const endpoint = "/api/v1/crimes";
            const url = apiUrl + endpoint;

            fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (!response.ok) {
                    setCrimesLoading(false);
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(crimedata => {
                console.log("Crime Data:", crimedata);
                // const crimeData = data.data;
                setCrimes(crimedata);

                // Store crime types in localStorage
                localStorage.setItem('crime-types', JSON.stringify(crimedata));
                setCrimesLoading(false);
            })
            .catch(error => {
                console.error("Error:", error);
            }); 
        }
    }, [token]);


    const handleLogout = () => {
        // Show a confirmation prompt before logging out
        const shouldLogout = window.confirm("Are you sure you want to log out?");
        
        if (shouldLogout) {
            // Clear user data from state and localStorage
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('all-users');
            localStorage.removeItem('crime-types');
            localStorage.removeItem('store-token');

            // Clear browser history
            window.history.replaceState(null, '', '/');

            // Redirect to the login page upon logout
            navigate('/');
        }
    };

    return (
        <section className='dashboard-page'>
            <SideBar user = {user} onLogout={handleLogout}/>
            <main className='main-dashboard'>
                <p id='display'>Display of <b>Crimes</b> vs <b>No. of Occurrences</b></p>
                <CrimeChart crimes = {crimes}/>
            </main>
            <CrimeEvents crimes={crimes} crimesloading = {crimesloading}/>
        </section>
    );
};

export default Dashboard;