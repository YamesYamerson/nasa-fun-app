import React from 'react';
import { useFetchNeoWs } from '../../functions/useFetchNeoWs'; // Custom hook to fetch NeoWs data
import './NeoWsContent.css'; // Import CSS file for styling

const NeoWsContent = ({ start_date = '2024-01-01', end_date = '2024-01-02' }) => {
  const { data, error, loading } = useFetchNeoWs(start_date, end_date); // Use the custom hook with start and end dates

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  if (!data || !data.near_earth_objects) {
    return <div>No data available for the specified date range</div>; // Handle case where no data is returned
  }

  return (
    <div className="neows-content">
      <h1 className="neows-title">Near Earth Objects from {start_date} to {end_date}</h1>
      <div className="neows-objects">
        {Object.keys(data.near_earth_objects).map((date) => (
          <div key={date} className="neows-date">
            <h2>Date: {date}</h2>
            {data.near_earth_objects[date].map((obj) => (
              <div key={obj.id} className="neows-object">
                <p>Name: {obj.name}</p>
                <p>Hazardous: {obj.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
                <p>Estimated Diameter (meters): {obj.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}</p>
                <p>Close Approach Date: {obj.close_approach_data[0].close_approach_date}</p>
                <p>Relative Velocity (km/h): {obj.close_approach_data[0].relative_velocity.kilometers_per_hour.toFixed(2)}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeoWsContent; // Correct export statement
