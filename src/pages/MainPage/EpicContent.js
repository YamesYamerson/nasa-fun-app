import React from 'react';
import { useFetchNasaEpic } from '../../functions/useFetchNasaEpic'; // Custom hook to fetch NASA EPIC content
import './EpicContent.css'; // Import CSS file for styling

const EpicContent = ({ date = '2024-01-01' }) => {
  const { data, error, loading } = useFetchNasaEpic(date); // Fetch EPIC metadata for a specified date

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  console.log('Fetched EPIC data:', data); // Debugging: log fetched metadata

  if (!data || data.length === 0) {
    return <div>No images available for this date ({date})</div>; // No data or empty data
  }

  return (
    <div className="epic-content">
      <h1 className="epic-title">NASA EPIC Images for {date}</h1>
      <div className="epic-images">
        {data.map((image) => (
          <div key={image.identifier} className="epic-image">
            <img
              src={`https://epic.gsfc.nasa.gov/archive/natural/${date.replace(/-/g, '/')}/png/${image.image}.png`}
              alt={`EPIC Image taken on ${date}`}
            />
            <p>Caption: {image.caption}</p> {/* Display caption for the image */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpicContent; // Ensure correct export statement
