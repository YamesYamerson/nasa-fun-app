import React from 'react';
import { useFetchMarsRoverPhotos } from '../../helper/useFetchMarsRoverPhotos'; // Custom hook to fetch Mars Rover photos
import './MarsRoverContent.css'; // Import CSS file for styling
import LoadingPage from '../../components/LoadingPage'; // Import LoadingScreen component

const MarsRoverContent = ({ sol }) => {
  const { data, error, loading } = useFetchMarsRoverPhotos(sol); // Use the custom hook with the specified 'sol'

  if (loading) {
    return <LoadingPage />; // Display loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  if (!data || data.length === 0) {
    return <div>No photos available for this sol</div>; // Handle case where no data or empty data
  }

  return (
    <div className="mars-rover-content">
      <h1 className="mars-rover-title">Mars Rover Photos for Sol {sol}</h1>
      <div className="mars-rover-photos">
        {data.map((photo) => (
          <div key={photo.id} className="mars-rover-photo">
            <img src={photo.img_src} alt={`Taken by ${photo.rover.name}`} /> {/* Corrected alt attribute */}
            <p>Camera: {photo.camera.full_name}</p> {/* Display camera information */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarsRoverContent;
