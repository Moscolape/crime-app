import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const apiUrl = "https://crime-analysis-jno2.onrender.com";
        const endpoint = "/api/v1/auth/me";
        const url = apiUrl + endpoint;

        const token = "1ee95ab0f114571473f29265eb062e7a7b278d1e48db2c755b88ae18d6ea6974";

        const headers = {
            "Authorization": `Bearer ${token}`
        };

        fetch(url, {
            method: "GET",
            headers: headers
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("User Profile:", data);
            setUser(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <h2>User Profile</h2>
                    <p>Name: {user.fullName}</p>
                    <p>Email: {user.email}</p>
                    {/* Display other user information as needed */}
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
};

export default Dashboard;