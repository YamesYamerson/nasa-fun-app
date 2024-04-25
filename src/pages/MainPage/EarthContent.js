import React from 'react';
import { useFetchEarth } from '../../helper/useFetchEarth'; // Assuming the hook is in this path

const EarthComponent = () => {
  // Fetch data from the 'imagery' endpoint with specific parameters
  const { data, error, loading } = useFetchEarth('imagery', { lat: 34.0522, lon: -118.2437 });

  if (loading) {
    return <p>Loading...</p>; // Display a loading message
  }

  if (error) {
    return <p>Error: {error}</p>; // Display the error message
  }

  return (
    <div>
      <h2>Earth Imagery Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the fetched data */}
    </div>
  );
};

export default EarthComponent;
