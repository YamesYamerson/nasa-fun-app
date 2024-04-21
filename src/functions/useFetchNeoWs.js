import { useState, useEffect } from 'react';

const NASA_API_KEY = 'k5NkO2ahsJNV6D84ph5bDu04U5YPYE30WC5hfgnW'; // Your NASA API key
const NEO_WS_URL = 'http://localhost:3001/neows'; // Server endpoint for NeoWs

export const useFetchNeoWs = (start_date, end_date) => {
  const [data, setData] = useState(null); // State for fetched data
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading indication

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading state
      try {
        if (!start_date || !end_date) {
          throw new Error('Start date or end date is undefined'); // Handle undefined dates
        }

        const response = await fetch(
          `${NEO_WS_URL}?start_date=${start_date}&end_date=${end_date}` // Fetch data from server endpoint
        );

        if (!response.ok) {
          throw new Error('Network response was not ok'); // Handle non-200 responses
        }

        const neoData = await response.json(); // Parse the JSON response
        console.log('Fetched NeoWs data:', neoData); // Add console logging for debugging
        setData(neoData); // Store fetched data
      } catch (err) {
        console.error('Error fetching NeoWs data:', err); // Add error logging for debugging
        setError(err.message); // Store error message
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchData(); // Fetch data when the useEffect is called
  }, [start_date, end_date]); // Dependency array with 'start_date' and 'end_date'

  return { data, error, loading }; // Return fetched data, error, and loading states
};
