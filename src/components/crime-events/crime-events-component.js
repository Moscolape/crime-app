import React, { useState } from 'react';
import './crime-events.styles.css';

import Loader from '../loader/loading-component';

const CrimeEvents = ({ crimes, crimesloading }) => {
    const [selectedCrime, setSelectedCrime] = useState('');
    const [crimeEvents, setCrimeEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [noCrimesFound, setNoCrimesFound] = useState(false);


    const getDate = (e) => {
        const selectedDate = e.target.value; // Get the selected date directly

        const storedToken = localStorage.getItem('store-token');
        console.log('Stored Token:', storedToken);
        console.log(selectedDate); // Use the selected date

        if (storedToken) {
            console.log('Fetching data...');
            const apiUrl = `https://crime-analysis-jno2.onrender.com/api/v1/crimes?from=${selectedDate}`; // Use the selected date
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
                if (data.data.length === 0) {
                    setNoCrimesFound(true);
                } else {
                    setNoCrimesFound(false);
                }
                setCrimeEvents(data.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching crime events:', error);
                setIsLoading(false);
            });
        }
    }

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
                            filteredCrimeEvents.map((event, index) => {
                                // Parse the event.date string into a Date object
                                const eventDate = new Date(event.date);

                                // Get the year, month, and day
                                const year = eventDate.getFullYear();
                                const month = String(eventDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
                                const day = String(eventDate.getDate()).padStart(2, '0');

                                return (
                                <div key={index}>
                                    <span><b>{event.geoCode.formattedAddress}</b></span><br />
                                    <span className='crimedate'>On <i>{`${year}-${month}-${day}`}</i></span>
                                    <li>{event.crime === "Human" ? "Human trafficking" : event.crime === "Others crimes" ? "Other crimes" : event.crime}</li>
                                </div>
                                );
                            })
                        ) : noCrimesFound ? (
                            <span id='date-message'>
                                No crimes were found from this date selection.
                            </span>
                        ) : (
                            <span id='date-message'>
                                {isCrimeNotFound
                                    ? `The crime "${selectedCrime}" was not found on this date selection.`
                                    : 'Pick a date first, then filter using the select crime options.'
                                }
                            </span>
                        )
                    )}
                </div>
            </div><br/>
        </div>
    );
}

export default CrimeEvents;