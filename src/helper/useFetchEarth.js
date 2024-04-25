import { useState, useEffect } from 'react';

const NASA_API_KEY = 'k5NkO2ahsJNV6D84ph5bDu04U5YPYE30WC5hfgnW'; // NASA API key
const BASE_URL = 'https://api.nasa.gov/planetary/earth/'; // Base URL for Earth-related data

// Custom hook to fetch data from the specified endpoint
export const useFetchEarth = (endpoint, queryParams = {}) => {
  const [data, setData] = useState(null); // State to hold fetched data
  const [error, setError] = useState(null); // State to hold error messages
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true
      try {
        // Build the full URL with query parameters
        const query = new URLSearchParams({
          ...queryParams,
          api_key: NASA_API_KEY, // Add the API key
        }).toString();

        const response = await fetch(`${BASE_URL}${endpoint}?${query}`); // Fetch data with constructed URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json(); // Parse the response JSON
        setData(jsonData); // Store the fetched data
      } catch (err) {
        setError(err.message); // Store error message
      } finally {
        setLoading(false); // Reset loading status
      }
    };

    fetchData(); // Call the function to fetch data
  }, [endpoint, JSON.stringify(queryParams)]); // Re-run effect if endpoint or query parameters change

  return { data, error, loading }; // Return data, error, and loading states
};
