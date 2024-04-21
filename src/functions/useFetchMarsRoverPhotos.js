import { useState, useEffect } from 'react';

// Custom hook to fetch Mars Rover photos from the Curiosity rover
export const useFetchMarsRoverPhotos = (sol = 1000) => {
  const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to indicate loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=k5NkO2ahsJNV6D84ph5bDu04U5YPYE30WC5hfgnW`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();
        setData(fetchedData.photos); // Store fetched photos
      } catch (err) {
        setError(err.message); // Store error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData(); // Fetch data when the hook is called
  }, [sol]); // Dependency array with 'sol' to allow re-fetching if 'sol' changes

  return { data, error, loading }; // Return fetched data, error, and loading states
};
