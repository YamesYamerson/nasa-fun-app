import { useState, useEffect } from 'react';

// Define the base URL for NASA Images API
const BASE_URL = 'https://images-api.nasa.gov/';
const NASA_API_KEY = 'k5NkO2ahsJNV6D84ph5bDu04U5YPYE30WC5hfgnW'; // Consistent API key

// Custom hook for fetching data from NASA Images API
export const useFetchNasaLib = (endpoint, queryParams = {}, triggerFetch) => {
  const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(false); // State for loading indication

  useEffect(() => {
    if (triggerFetch) { // Fetch data when triggerFetch is true
      const fetchData = async () => {
        setLoading(true); // Set loading state to true
        try {
          // Construct the query string, ensuring valid encoding
          const query = new URLSearchParams({
            ...queryParams,
            api_key: NASA_API_KEY, // Include the consistent API key
          }).toString();

          // Fetch data from the specified endpoint with the query parameters
          const response = await fetch(`${BASE_URL}${endpoint}?${query}`);

          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`); // Detailed error handling
          }

          const jsonData = await response.json(); // Parse the JSON response
          setData(jsonData); // Store the fetched data
        } catch (err) {
          setError(err.message); // Set the error message
        } finally {
          setLoading(false); // Reset the loading state
        }
      };

      fetchData(); // Trigger fetching data
    }
  }, [endpoint, JSON.stringify(queryParams), triggerFetch]); // Dependencies for re-running the effect

  return { data, error, loading }; // Return data, error, and loading states
};
