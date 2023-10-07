import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { useCrimesContext } from '../../contexts/crime-data-context';

import './crime-barchart.styles.css';

const CrimeChart = () => {
  const { crimes } = useCrimesContext();
  const chartRef = useRef(null);

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

      if (chartRef.current) {
        // Destroy any existing chart
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('crimeChart').getContext('2d');
      chartRef.current = new Chart(ctx, {
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
                  weight: 'bold',
                  size: '16px'
                }
              },
              grid: {
                display: false,
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Occurrences',
                font: {
                  weight: 'bold',
                  size: '16px'
                }
              }
            }
          }
        }
      });
    }
  }, [crimes]);

  return (
    <div className='canvas'>
      <canvas id="crimeChart"></canvas>
    </div>
  );
};

export default CrimeChart;
