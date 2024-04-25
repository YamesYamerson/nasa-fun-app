import { useState, useEffect } from 'react';

// API key and base URL for NASA InSight API
const NASA_API_KEY = 'k5NkO2ahsJNV6D84ph5bDu04U5YPYE30WC5hfgnW'; // Replace with your actual NASA API key
const BASE_URL = 'https://api.nasa.gov/insight_weather/'; // Base URL for the API

export const useFetchInsight = (queryParams, triggerFetch) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (triggerFetch) {
      const fetchData = async () => {
        setLoading(true);

        try {
          const query = new URLSearchParams({
            ...queryParams,
            api_key: NASA_API_KEY,
          }).toString();

          const response = await fetch(`${BASE_URL}?${query}`);
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
          }

          const jsonData = await response.json();
          console.log('Fetched Data:', jsonData); // Log the fetched data

          setData(jsonData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData(); // Fetch the data when triggerFetch changes
    }
  }, [JSON.stringify(queryParams), triggerFetch]); // Dependencies to trigger re-fetching

  return { data, error, loading };
};
