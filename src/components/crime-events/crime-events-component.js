import React, { useEffect, useState, useContext } from 'react';
import TokenContext from '../../contexts/token-context';

import './crime-events.styles.css';

const CrimeEvents = () => {
    const [crimes, setCrimes] = useState(null);
    const [crimesloading, setCrimesLoading] = useState(false);

    const { token } = useContext(TokenContext);
    
    // Load user data from localStorage on component mount
    useEffect(() => {
        setCrimesLoading(true);

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
        .then(data => {
            console.log("Crime Data:", data);
            setCrimes(data);
            setCrimesLoading(false);
        })
        .catch(error => {
            console.error("Error:", error);
        }); 
    }, [token]);

    return (
        <div className="crime-types">
            <p><b>Overview of Events</b></p>
            <div>
                {crimes ? (
                    <div>
                        {[...new Set(crimes.data.map(crimeevent => crimeevent.crime))].map((crimeType, id) => (
                            <span style={{display:'block'}} key={id}>{crimeType}</span>
                        ))}
                    </div>
                ) : (
                    <p>{crimesloading ? "Getting crime event types..." : "No crime data yet."}</p>
                )}  
            </div>
        </div>
    );
}

export default CrimeEvents;