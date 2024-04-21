import React from 'react';
import { UseFetchNasaApod } from '../../functions/UseFetchNasaApod'; // Correct import
import './PotdContent.css'; // Import CSS file for styling
const PotdContent = () => {
  const { data, error, loading } = UseFetchNasaApod(); // Fetch data with the custom hook

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  if (!data) {
    return <div>No data available</div>; // Handle case where data is null
  }

  return (
    <div className="apod">
      <h1 className="votd-title">Nasa Video of the Day</h1>
      <h1>{data.title}</h1> {/* Display APOD title */}
      <iframe
        width="1000"
        height="500"
        src={data.url}
        title={data.title} // Accessible title for the video
        frameBorder="0"
        allowFullScreen // Allow fullscreen mode
      ></iframe> {/* Embed YouTube video */}
      <p>{data.explanation}</p> {/* Display APOD explanation */}
    </div>
  );
};

export default PotdContent; // Correct export statement
