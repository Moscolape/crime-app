import React, { useState } from 'react';
import Dashboard from '../../components/my-dashboard/my-dashboard-component';
import './context-analysis.styles.css';

const ContextAnalysis = () => {
  const [text, setText] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [analysing, setAnalysing] = useState(false);


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
        console.log('Data from the API:', data);
        console.log(responseData);
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
        <h2>Enter text for analysis</h2>
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
      </div>
    </Dashboard>
  );
};

export default ContextAnalysis;