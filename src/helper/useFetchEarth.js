import { useState, useEffect } from 'react';

// Your NASA API key and base URL for the Earth API
const NASA_API_KEY = 'k5NkO2ahsJNV6D84ph5bDu04U5YPYE30WC5hfgnW';
const BASE_URL = 'https://api.nasa.gov/planetary/earth/';

// Updated useFetchEarth hook with improvements
export const useFetchEarth = (endpoint, queryParams = {}, triggerFetch) => {
  const [data, setData] = useState(null); // State to hold fetched data
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading status

  useEffect(() => {
    if (triggerFetch) {
      const fetchData = async () => {
        setLoading(true); // Set loading state to true
        
        try {
          // Construct query string with provided parameters and the API key
          const query = new URLSearchParams({
            ...queryParams,
            api_key: NASA_API_KEY, // Include API key
          }).toString();

          console.log('Fetching from:', `${BASE_URL}${endpoint}?${query}`); // Log the fetch URL

          // Validate essential parameters
          if (!queryParams.lat || !queryParams.lon) {
            setError('Invalid parameters: latitude and longitude are required.');
            setLoading(false); // Stop loading if there's an error
            return;
          }

          // Make the fetch request
          const response = await fetch(`${BASE_URL}${endpoint}?${query}`);
          if (!response.ok) {
            throw new Error(
              `Error fetching data: ${response.status} - ${response.statusText}` // Detailed error handling
            );
          }

          const jsonData = await response.json(); // Parse JSON data
          setData(jsonData); // Set fetched data
        } catch (err) { // Corrected catch block
          console.error('Error fetching data:', err); // Log error details
          setError(err.message); // Set error message
        } finally {
          setLoading(false); // Reset loading state
        }
      };

      fetchData(); // Execute the fetch operation
    }
  }, [endpoint, JSON.stringify(queryParams), triggerFetch]); // Dependencies to ensure re-triggering

  // Return fetched data, error state, and loading state
  return { data, error, loading };
};
