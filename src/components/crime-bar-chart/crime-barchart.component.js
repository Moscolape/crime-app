import React, { useEffect } from 'react';
import { Chart } from 'chart.js/auto';

import './crime-barchart.styles.css'

const CrimeChart = ({ crimes }) => {
    useEffect(() => {
        if (crimes && crimes.data && crimes.data.length > 0) {
            const crimeCounts = {};

            crimes.data.forEach(entry => {
                let crime = entry.crime;

                // Modify crime labels
                if (crime === 'Human') {
                    crime = 'Human trafficking';
                } else if (crime === 'Others crimes') {
                    crime = 'Other crimes';
                }

                if (crimeCounts[crime]) {
                    crimeCounts[crime]++;
                } else {
                    crimeCounts[crime] = 1;
                }
            });

            const ctx = document.getElementById('crimeChart').getContext('2d');

            // Destroy any existing chart on the canvas
            if (ctx.chart) {
                ctx.chart.destroy();
            }

            const config = {
                type: 'bar',
                data: {
                    labels: Object.keys(crimeCounts),
                    datasets: [{
                        label: 'Number of Occurrences',
                        data: Object.values(crimeCounts),
                        backgroundColor: '#e49376'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'category',
                            title: {
                                display: true,
                                text: 'Crimes',
                                font: {
                                    weight: 'bold'
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Number of Occurrences',
                                font: {
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                }
            };


            new Chart(ctx, config);
        }
    }, [crimes]);

    return (
        <div className='canvas'>
            <canvas id="crimeChart"></canvas>
        </div>
    );
};

export default CrimeChart;