import React, { createContext, useContext, useState, useEffect } from 'react';
import TokenContext from './token-context';

const CrimesContext = createContext();

export const useCrimesContext = () => {
  return useContext(CrimesContext);
};

export const CrimesProvider = ({ children }) => {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(TokenContext);


  useEffect(() => {
    setLoading(true);

    const storeCrimes = JSON.parse(sessionStorage.getItem('crime-types'));

    if (storeCrimes) {
      console.log(storeCrimes);
      setCrimes(storeCrimes);
      setLoading(false);
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
              throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
      })
      .then(crimedata => {
          console.log("Crime Data:", crimedata);
          setCrimes(crimedata);

          // Store crime types in sessionStorage
          sessionStorage.setItem('crime-types', JSON.stringify(crimedata));
          setLoading(false);
      })
      .catch(error => {
          console.error("Fetch Error:", error);
          setLoading(false);
      }); 
    }
  }, [token]);

  return (
    <CrimesContext.Provider value={{ crimes, loading }}>
      {children}
    </CrimesContext.Provider>
  );
};
