import React, { useState, useEffect } from 'react';
import './crime-events.styles.css';

import Loader from '../loader/loading-component';

const CrimeEvents = ({ crimes, crimesloading }) => {
    const [crimeDate, setCrimeDate] = useState('');
    const [selectedCrime, setSelectedCrime] = useState('');
    const [crimeEvents, setCrimeEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(crimeDate);
    }, [crimeDate]);

    const getDate = (e) => {
        setCrimeDate(e.target.value);
        const storedToken = localStorage.getItem('store-token');
        console.log('Stored Token:', storedToken);
        
        if (storedToken) {
            console.log('Fetching data...');
            const apiUrl = `https://crime-analysis-jno2.onrender.com/api/v1/crimes?from=${crimeDate}`;
            console.log('API URL:', apiUrl);

            setIsLoading(true);

            fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${storedToken}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                console.log('Response Status:', response.status);
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })            
            .then(data => {
                console.log('Fetched Data:', data);
                setCrimeEvents(data.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching crime events:', error);
                setIsLoading(false);
            });
        }
    };

    const handleCrimeTypeChange = (e) => {
        setSelectedCrime(e.target.value);
    };

    // Filter crime events based on selected crime type
    const filteredCrimeEvents = crimeEvents.filter(event => {
        return selectedCrime === '' || event.crime === selectedCrime;
    });

    // Check if the selected crime is not found in the filtered events
    const isCrimeNotFound = selectedCrime !== '' && filteredCrimeEvents.every(event => event.crime !== selectedCrime);


    return (
        <div className="crime-types">
            <div className='check-crime-event'>
                <input type='date' onInput={getDate} className='crime-date' />
                <div>
                    {crimes ? (
                        <div>
                            <select id="crimeTypeSelect" onChange={handleCrimeTypeChange} value={selectedCrime}>
                                <option value="">Choose crime</option>
                                {[...new Set(crimes.data.map(crimeevent => {
                                    if (crimeevent.crime === "Human") {
                                        return "Human trafficking";
                                    }
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
            <div className='event-overview'>
                <span><b>EVENTS</b></span>
                <div style={{position: 'relative'}}>
                    {/* Display filtered crime events or loader */}
                    {isLoading ? (
                        <Loader />
                    ) : (
                        filteredCrimeEvents.length > 0 ? (
                            filteredCrimeEvents.map((event, index) => (
                                <div key={index}>
                                    <p><b>{event.geoCode.formattedAddress}</b></p>
                                    <li>{event.crime === "Human" ? "Human trafficking" : event.crime === "Others crimes" ? "Other crimes" : event.crime}</li>
                                </div>
                            ))
                        ) : (
                            <span id='date-message'>
                                {isCrimeNotFound
                                    ? `The crime "${selectedCrime}" was not found on this date.`
                                    : 'Pick a date first, then filter using the select crime options.'
                                }
                            </span>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default CrimeEvents;