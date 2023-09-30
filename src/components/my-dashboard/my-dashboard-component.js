import React, { useEffect, useState, useContext } from 'react';
import './my-dashboard-component.styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

import TokenContext from '../../contexts/token-context';

import SideBar from '../sidebar/sidebar-component';
import CrimeEvents from '../crime-events/crime-events-component';
import CrimeChart from '../crime-bar-chart/crime-barchart.component';
import Loader from '../loader/loading-component';
import PieChart from '../crime-pie-chart/crime-piechart.component';
import CrimeMap from '../crime-map/crime-map.component';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [crimes, setCrimes] = useState(null);
    const [crimesloading, setCrimesLoading] = useState(false);

    const { token } = useContext(TokenContext);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const navigate = useNavigate();

    // Check if the user is authenticated, if not, navigate back to login
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    // Load user data from sessionStorage on component mount
    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
        setUser(storedUser);
        }

        // Fetch user data and update sessionStorage when token changes
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
                
                // Store user data and token in sessionStorage
                sessionStorage.setItem('user', JSON.stringify(data)); 
                sessionStorage.setItem('store-token', token);
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }
    }, [token]);

    useEffect(() => {
        if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
        } else {
        sessionStorage.removeItem('user');
        }
    }, [user]);

    // Load crime data from localStorage on component mount
    useEffect(() => {
        setCrimesLoading(true);

        const storeCrimes = JSON.parse(sessionStorage.getItem('crime-types'));

        if (storeCrimes) {
            console.log(storeCrimes);
            setCrimes(storeCrimes);
            setCrimesLoading(false);
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
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(crimedata => {
                console.log("Crime Data:", crimedata);
                setCrimes(crimedata);

                // Store crime types in localStorage
                sessionStorage.setItem('crime-types', JSON.stringify(crimedata));
                setCrimesLoading(false);
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                setCrimesLoading(false);
            }); 
        }
    }, [token]);


    const handleLogout = () => {
        const shouldLogout = window.confirm("Are you sure you want to log out?");
        
        if (shouldLogout) {
            setUser(null);
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('crime-types');
            sessionStorage.removeItem('store-token');
            
            window.history.replaceState(null, '', '/');
            navigate('/');
        }
    };

    return (
        <>
        <div className={`Navbar ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <FontAwesomeIcon
                onClick={toggleSidebar}
                icon={sidebarOpen ? faClose : faBars}
                className="menu-icon"
            />
            <span className='logo'><b>CFAS</b></span>
        </div>
        <section 
            className={
                `dashboard-page ${sidebarOpen ? 'sidebar-open' : ''} ${sidebarOpen ? 'overlay' : ''}`
            }>
            <SideBar sidebarOpen = {sidebarOpen} user = {user} onLogout={handleLogout}/>
            <main className='main-dashboard'>
                <p id='display'>Display of <b>Crimes</b> vs <b>No. of Occurrences</b></p>
                {crimesloading ? <Loader /> : <CrimeChart crimes={crimes} />}
                {crimes && <PieChart crimes={crimes} className="pie" />}
                <CrimeMap crimes = {crimes}/>
            </main>
            <CrimeEvents crimes={crimes} crimesloading = {crimesloading}/>
        </section>
        </>
    );
};

export default Dashboard;