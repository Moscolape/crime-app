import React, { useState, useEffect, useRef } from 'react';
import Dashboard from '../../components/my-dashboard/my-dashboard-component';
import './context-analysis.styles.css';
import { Chart } from 'chart.js/auto';

const ContextAnalysis = () => {
  const [text, setText] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [analysing, setAnalysing] = useState(false);
  const [percentages, setPercentages] = useState([]);
  const [labels, setLabels] = useState([]);

  // Use a ref to keep track of the chart instance
  const chartRef = useRef(null);
  const chartCanvas = useRef(null);

  useEffect(() => {
    // When responseData changes, update the chart data and percentages
    if (responseData) {
      const data = responseData.data;

      // Extract data and labels from the response
      const responseLabels = Object.keys(data);
      const values = responseLabels.map((label) => data[label]);

      setLabels(responseLabels); // Set the labels in state

      // You can define colors here, or use a chart color palette
      const backgroundColor = ['#D0D5DD', '#FFC300', '#36A2EB', '#F30C12', '#2ECC71', 'cyan', '#e49376', '#997BD1'];

      // Calculate percentages
      const total = values.reduce((acc, val) => acc + val, 0);
      const calculatedPercentages = values.map((value) => ((value / total) * 100).toFixed(0));

      // Filter percentages and labels for rendering
      const filteredPercentages = calculatedPercentages.filter((percentage) => parseFloat(percentage) > 0);
      const filteredLabels = responseLabels.filter((_, index) => parseFloat(calculatedPercentages[index]) > 0);

      // Set the filtered percentages and labels in state
      setPercentages(filteredPercentages);
      setLabels(filteredLabels);

      // Destroy the existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart
      const ctx = chartCanvas.current.getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: responseLabels,
          datasets: [
            {
              data: values,
              backgroundColor,
              borderWidth: 0,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
        },
      });
    }
  }, [responseData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAnalysing(true);

    // Create a JSON object with the text
    const requestBody = {
      context: text,
    };

    // Make a POST request to the API
    try {
      const response = await fetch('https://crime-analysis-app.vercel.app/api/v1/context/newstext', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
        setAnalysing(false);
      } else {
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Dashboard>
      <div className='general'>
        <h2>Enter Text for Analysis</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className='context'
            placeholder='You can paste any text or write yours...'
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button type='submit' className='analyse'>
            {analysing ? 'Analyzing text...' : 'Analyze'}
          </button>
        </form>
        <div className='pie-analysis'>
          {responseData && (
            <div className='chart-container'>
              <h2>Analysis Results</h2>
              <canvas ref={chartCanvas}></canvas>
            </div>
          )}
          {responseData && (
            <div className='percentages-container'>
              <h3>Percentages:</h3>
              <ul>
                {percentages.map((percentage, index) => (
                  <li key={index}>{labels[index]}: {percentage}%</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default ContextAnalysis;