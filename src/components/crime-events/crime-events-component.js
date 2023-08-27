// import React, { useEffect, useState } from 'react';

import './crime-events.styles.css';

const CrimeEvents = ({crimes, crimesloading}) => {

    // const [crimeDate, setCrimeDate] = useState('');

    // const getDate = () => {

    // }


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
            <div className='event-overview'>
                <span><b>Events</b></span>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora modi sapiente vero facilis beatae animi quam debitis quas atque voluptates porro esse nulla ad aperiam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora modi sapiente vero facilis beatae animi quam debitis quas atque voluptates porro esse nulla ad aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora modi sapiente vero facilis beatae animi quam debitis quas atque voluptates porro esse nulla ad aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora modi sapiente vero facilis beatae animi quam debitis quas atque voluptates porro esse nulla ad aperiam.
                </div>
            </div>
        </div>
    );
}

export default CrimeEvents;