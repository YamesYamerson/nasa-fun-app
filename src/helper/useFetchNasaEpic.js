import { useState, useEffect } from 'react';

const NASA_API_KEY = 'k5NkO2ahsJNV6D84ph5bDu04U5YPYE30WC5hfgnW'; // Your NASA API key
const NASA_EPIC_URL = `https://api.nasa.gov/EPIC/api/natural/date`; // Base URL for NASA EPIC with date-based queries

export const useFetchNasaEpic = (date) => {
  const [data, setData] = useState(null); // State for fetched metadata
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading indication

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading state
      try {
        if (!date) {
          throw new Error('Date parameter is undefined'); // Error if date is not defined
        }

        const response = await fetch(
          `${NASA_EPIC_URL}/${date}?api_key=${NASA_API_KEY}` // Fetch metadata for a specific date
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const epicData = await response.json(); // Parse the JSON response
        setData(epicData); // Store the fetched metadata
      } catch (err) {
        setError(err.message); // Store error message
      } finally {
        setLoading(false); // Reset loading status
      }
    };

    fetchData(); // Fetch data when the useEffect is called
  }, [date]); // Dependency array with 'date' to re-fetch when 'date' changes

  return { data, error, loading }; // Return fetched data, error, and loading states
};
