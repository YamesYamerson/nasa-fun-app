import { useState, useEffect } from 'react';

const NASA_API_KEY = 'k5NkO2ahsJNV6D84ph5bDu04U5YPYE30WC5hfgnW'; // Replace with your NASA API key
const NASA_MARS_ROVER_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`; // Base URL for Mars Rover photos

// Custom hook to fetch Mars Rover photos
export const useFetchMarsRoverPhotos = (sol = 1000) => {
  const [data, setData] = useState(null); // State for fetched data
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state
      try {
        const response = await fetch(
          `${NASA_MARS_ROVER_URL}?sol=${sol}&api_key=${NASA_API_KEY}`
        ); // Fetch data for the specified sol
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const roverData = await response.json();
        setData(roverData.photos); // Store the fetched photos
      } catch (err) {
        setError(err.message); // Store error message
      } finally {
        setLoading(false); // Reset loading status
      }
    };

    fetchData(); // Fetch data when the useEffect is triggered
  }, [sol]); // Dependency array with 'sol' to re-fetch when 'sol' changes

  return { data, error, loading }; // Return the fetched data, error, and loading states
};
