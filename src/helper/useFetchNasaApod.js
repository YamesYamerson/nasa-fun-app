import { useState, useEffect } from 'react';

const NASA_API_KEY = 'k5NkO2ahsJNV6D84ph5bDu04U5YPYE30WC5hfgnW'; // Replace with your NASA API key
const NASA_APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

// Custom hook to fetch the Astronomy Picture of the Day (APOD)
export const useFetchNasaApod = () => { // Custom hook name starts with 'use'
  const [data, setData] = useState(null); // State for fetched data
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(NASA_APOD_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const apodData = await response.json();
        setData(apodData); // Set fetched data
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Reset loading status
      }
    };

    fetchData(); // Fetch data when the function is called
  }, []); // Empty dependency array to ensure useEffect is only called once

  return { data, error, loading }; // Return data, error, and loading states
};
