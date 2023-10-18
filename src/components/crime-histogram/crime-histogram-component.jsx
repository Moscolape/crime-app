import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useCrimesContext } from '../../contexts/crime-data-context';

import './crime-histogram.styles.css';

const CrimeHistogram = () => {
  const { crimes } = useCrimesContext();
  const [filteredState, setFilteredState] = useState('');
  const [filteredData, setFilteredData] = useState(crimes.data);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showHistogram, setShowHistogram] = useState(false);

  useEffect(() => {
    // Check if crimes data is available and set filtered data initially
    if (crimes && crimes.data) {
      setFilteredData(crimes.data);
    }
  }, [crimes]);

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
      setShowHistogram(false);
    } else {
      setErrorMessage(null);
      setShowHistogram(true);
    }

    setFilteredData(filtered);
  };

  const crimeCounts = filteredData.reduce((counts, entry) => {
    const crimeType = entry.crime;
    const updatedLabel = labelChanges[crimeType] || crimeType;

    counts[updatedLabel] = (counts[updatedLabel] || 0) + 1;
    return counts;
  }, {});

  const crimeLabels = Object.keys(crimeCounts);
  const crimeData = Object.values(crimeCounts);

  // Configure dataset options
  const datasetOptions = {
    barPercentage: 1.0,
    categoryPercentage: 1.0,
    borderColor: 'gray',
    borderWidth: 0.5
  };

  const histogramData = {
    labels: crimeLabels,
    datasets: [
      {
        label: 'Number of Occurrences',
        data: crimeData,
        backgroundColor: '#9f81f170',
        ...datasetOptions
      },
    ],
  };

  // Configure chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const isButtonDisabled = filteredState.trim() === '';

  return (
    <div className="histogram">
      <h3>Filter by State to Check Crime Distribution</h3>
      <div className="filter-container">
        <select
          value={filteredState}
          onChange={(e) => setFilteredState(e.target.value)}
        >
          <option value="">Select a State</option>
          <option value="Abia">Abia</option>
          <option value="Adamawa">Adamawa</option>
          <option value="Akwa Ibom">Akwa Ibom</option>
          <option value="Anambra">Anambra</option>
          <option value="Bauchi">Bauchi</option>
          <option value="Bayelsa">Bayelsa</option>
          <option value="Benue">Benue</option>
          <option value="Borno">Borno</option>
          <option value="Cross River">Cross River</option>
          <option value="Delta">Delta</option>
          <option value="Ebonyi">Ebonyi</option>
          <option value="Edo">Edo</option>
          <option value="Ekiti">Ekiti</option>
          <option value="Enugu">Enugu</option>
          <option value="Gombe">Gombe</option>
          <option value="Imo">Imo</option>
          <option value="Jigawa">Jigawa</option>
          <option value="Kaduna">Kaduna</option>
          <option value="Kano">Kano</option>
          <option value="Katsina">Katsina</option>
          <option value="Kebbi">Kebbi</option>
          <option value="Kogi">Kogi</option>
          <option value="Kwara">Kwara</option>
          <option value="Lagos">Lagos</option>
          <option value="Nasarawa">Nasarawa</option>
          <option value="Niger">Niger</option>
          <option value="Ogun">Ogun</option>
          <option value="Ondo">Ondo</option>
          <option value="Osun">Osun</option>
          <option value="Oyo">Oyo</option>
          <option value="Plateau">Plateau</option>
          <option value="Rivers">Rivers</option>
          <option value="Sokoto">Sokoto</option>
          <option value="Taraba">Taraba</option>
          <option value="Yobe">Yobe</option>
          <option value="Zamfara">Zamfara</option>
        </select>
        <button onClick={handleFilter} disabled={isButtonDisabled}>
          Show stats {`${filteredState ? `for ${filteredState}`: ''}`}
        </button>
      </div>
      {filteredState && showHistogram ? (
        <>
          <h1>{filteredState.toUpperCase() + `${filteredState.toLowerCase().includes('abuja') ? '' : ' STATE'}`}</h1>
          <div className="histogram-chart">
            <Bar data={histogramData} options={chartOptions} />
          </div>
        </>
      ) : null}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CrimeHistogram;