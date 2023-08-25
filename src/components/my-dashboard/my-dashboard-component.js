import React, { useEffect, useState, useContext } from 'react';
import './my-dashboard-component.styles.css';


import { useNavigate } from 'react-router-dom';

import TokenContext from '../../contexts/token-context';

import SideBar from '../sidebar/sidebar-component';
import CrimeEvents from '../crime-events/crime-events-component';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [allusers, setAllUsers] = useState(null);

    const { token } = useContext(TokenContext);

    const [userloading, setUserLoading] = useState(false);

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
                
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(data)); 
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }
    }, [token]);


    const getAllUsers = () => {
        setUserLoading(true);

        const storeAllUser = JSON.parse(localStorage.getItem('all-users'));
        
        if (storeAllUser) {
            setUserLoading(false);
            setAllUsers(storeAllUser);
        } else {
            const apiUrl = "https://crime-analysis-jno2.onrender.com";
            const endpoint = "/api/v1/users";
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
                    setUserLoading(false);
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("All Users Info:", data);
                setAllUsers(data);
                // Store all-user data in localStorage
                localStorage.setItem('all-users', JSON.stringify(data)); 
                setUserLoading(false);
            })
            .catch(error => {
                console.error("Error:", error);
            }); 
        }
    }


    const handleLogout = () => {
        // Clear user data from state and localStorage
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('all-users');
        localStorage.removeItem('crime-types');

        // Clear browser history
        window.history.replaceState(null, '', '/');

        // Redirect to the login page upon logout
        navigate('/');
    };



    return (
        <section className='dashboard-page'>
            <SideBar user = {user} onLogout={handleLogout}/>
            <main className='main-dashboard'>
                <div className='user-dashboard'>
                    {user ? (
                        <div>
                            <h2>User Profile</h2>
                            <p><b>Name:</b> {user.data.fullName}</p>
                            <p><b>Email:</b> {user.data.email}</p>
                        </div>
                    ) : (
                        <p>Dashboard loading...</p>
                    )}
                </div>
                <div className='users'>
                    <button id='get-crimes' onClick={getAllUsers} title='Load the crime report'>
                        {userloading ? "Loading..." : "Check all users"}
                    </button>
                    <div>
                        {allusers ? (
                            <div>
                                <h2>All Users</h2>
                                {allusers.msg.map((user, id) => {
                                    return <li key={id}>{user.fullName}</li>
                                })}
                            </div>
                        ) : (
                            <p>{userloading ? "Getting all user data..." : "No user data yet."}</p>
                        )}  
                    </div>
                </div>
            </main>
            <CrimeEvents/>
        </section>
    );
};

export default Dashboard;