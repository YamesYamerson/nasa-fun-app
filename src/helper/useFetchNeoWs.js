import { useState, useEffect } from 'react';

const NASA_API_KEY = 'k5NkO2ahsJNV6D84ph5bDu04U5YPYE30WC5hfgnW'; // NASA API key
const NEO_WS_URL = 'https://api.nasa.gov/neo/rest/v1/feed'; // NASA NeoWs endpoint

const useFetchNeoWs = (start_date, end_date) => {
  const [data, setData] = useState(null); // Fetched data
  const [error, setError] = useState(null); // Error handling
  const [loading, setLoading] = useState(true); // Loading indication

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading state
      try {
        const response = await fetch(
          `${NEO_WS_URL}?start_date=${start_date}&end_date=${end_date}&api_key=${NASA_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Handle non-200 responses
        }

        const neoData = await response.json(); // Parse the JSON response
        setData(neoData); // Store fetched data
      } catch (err) {
        setError(err.message); // Store error message
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchData(); // Fetch data when the useEffect is called
  }, [start_date, end_date]);

  return { data, error, loading }; // Return fetched data, error, and loading states
};

export default useFetchNeoWs; // Ensure proper export
