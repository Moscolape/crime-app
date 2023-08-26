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
            .then(data => {
                console.log("Crime Data:", data);
                setCrimes(data);

                // Store crime types in localStorage
                localStorage.setItem('crime-types', JSON.stringify(data));
                setCrimesLoading(false);
            })
            .catch(error => {
                console.error("Error:", error);
            }); 
        }
    }, [token]);


    return (
        <div className="crime-types">
            <div className='check-crime-event'>
                <input type='date' className='crime-date'/>
                <div>
                    {crimes ? (
                        <div>
                            <select id="crimeTypeSelect">
                                <option value="">Choose crime</option>
                                {[...new Set(crimes.data.map(crimeevent => {
                                // Replace "human" with "human trafficking"
                                if (crimeevent.crime === "Human") {
                                    return "Human trafficking";
                                }
                                // Replace "others crimes" with "others"
                                if (crimeevent.crime === "Others crimes") {
                                    return "Other crimes";
                                }
                                return crimeevent.crime;
                                }))].map((crimeType, id) => (
                                <option key={id} value={crimeType}>{crimeType}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <span>{crimesloading ? "Getting crimes..." : "No crime yet."}</span>
                        )}
                </div>
            </div>
            <p style={{color:'#997BD1'}}><b>Events</b></p>
        </div>
    );
}

export default CrimeEvents;