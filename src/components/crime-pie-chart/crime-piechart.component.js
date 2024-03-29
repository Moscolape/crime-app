import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { useCrimesContext } from '../../contexts/crime-data-context';


import './crime-piechart.styles.css';

const PieChart = () => {
  const { crimes } = useCrimesContext();
  const [filteredState, setFilteredState] = useState('');
  const [filteredData, setFilteredData] = useState(crimes.data);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPieChart, setShowPieChart] = useState(false);
  const [displayedState, setDisplayedState] = useState('');


  useEffect(() => {
    // Check if crimes data is available and set filtered data initially
    if (crimes && crimes.data) {
      setFilteredData(crimes.data);
    }
  }, [crimes]);

  // Create a mapping of label changes
  const labelChanges = {
    'Human': 'Human trafficking',
    'Others crimes': 'Other crimes',
    // Add more label changes as needed
  };

  const handleFilter = () => {
    // Filter the data based on the entered state
    const filtered = crimes.data.filter(entry =>
      entry.state.toLowerCase() === filteredState.toLowerCase()
    );

    if (filtered.length === 0) {
      setErrorMessage(
        "There's no data for the state you entered. This could be a typo error or the state may not be available in the dataset."
      );
      setShowPieChart(false); // Hide pie chart if there's an error
    } else {
      setDisplayedState(filteredState);
      setErrorMessage(null);
      setShowPieChart(true); // Show pie chart if there's no error
    }

    setFilteredData(filtered);
    setFilteredState('');
  };

  const crimeCounts = filteredData.reduce((counts, entry) => {
    const crimeType = entry.crime;

    // Use the label changes mapping to update the label
    const updatedLabel = labelChanges[crimeType] || crimeType;

    counts[updatedLabel] = (counts[updatedLabel] || 0) + 1;
    return counts;
  }, {});

  const crimeLabels = Object.keys(crimeCounts);
  const crimeData = Object.values(crimeCounts);

  const pieData = {
    labels: crimeLabels,
    datasets: [
      {
        data: crimeData,
        backgroundColor: [
            '#F0DF9D',
            '#E49376',
            '#B8662C',
            '#997BD1',
            '#C3A71F',
            '#E3E8EC',
            '#305EA1',
            '#0A2A59',
            '#608830',
        ],
      },
    ],
  };

  const totalCrimes = crimeData.reduce((sum, count) => sum + count, 0);
  const crimePercentages = crimeData.map(count => ((count / totalCrimes) * 100).toFixed(1));

  // Configure chart options to reduce size
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Disable the "Show stats" button when the input is empty
  const isButtonDisabled = filteredState.trim() === '';

  return (
    <div className='pie' data-aos="fade-left">
      <h3>Enter state to check crime distribution</h3>
      <div className="filter-container">
        <input
          type="text"
          placeholder="e.g Lagos"
          value={filteredState}
          onChange={(e) => setFilteredState(e.target.value)}
        />
        <button onClick={handleFilter} disabled={isButtonDisabled}>
          Show stats
        </button>
        {showPieChart ? (
          <>
            <h1>{displayedState.toUpperCase() + `${displayedState.toLowerCase().includes('abuja') ? '' : ' STATE'}`}</h1>
            <div className="percentage-table">
              <h4>Crime Percentages:</h4>
              <ul className='percentage-list'>
                {crimeLabels.map((label, index) => (
                  <li key={index} className='list-item'>
                    {label}: <b>{crimePercentages[index]}%</b>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}
      </div>
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : showPieChart ? (
        <div className='pie-container'>
          <Pie data={pieData} options={chartOptions}/>
        </div>
      ) : null}
    </div>
  );
};

export default PieChart;