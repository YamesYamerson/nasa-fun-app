import React from 'react';
import { useFetchNasaApod } from '../../helper/useFetchNasaApod'; // Custom hook to fetch APOD content
import './PotdContent.css'; // Import CSS file for styling
import HappyPlanetLoading from '../../components/HappyPlanetLoading';

const PotdContent = () => {
  const { data, error, loading } = useFetchNasaApod('http://localhost:3001/apod'); // Use proxy server for APOD

  if (loading) {
    return <HappyPlanetLoading />; // Properly return a new instance of LoadingPage
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  if (!data) {
    return <div>No data available</div>; // Handle case where data is null
  }

  const isVideo = data.url.includes('youtube.com') || /\.(mp4|mov|avi)$/.test(data.url); // Check if content is video

  return (
    <div className="apod">
      <h1>{data.title}</h1> {/* Display APOD title */}
      {isVideo ? (
        <iframe
          width="560"
          height="315"
          src={data.url}
          title={data.title}
          frameBorder="0"
          allowFullScreen
        ></iframe> // Ensure correct syntax for the iframe
      ) : (
        <img src={data.url} alt={data.title} /> // Properly closed img tag with correct syntax
      )}
      <p>{data.explanation}</p> {/* Display APOD explanation */}
    </div>
  );
};

export default PotdContent;
