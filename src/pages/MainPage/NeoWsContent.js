import React, { useEffect, useState } from 'react';
import useFetchNeoWs from '../../helper/useFetchNeoWs';
import './NeoWsContent.css';

const NeoWsContent = ({ start_date, end_date }) => {
  // Ensure default dates are set if not provided
  const [finalStartDate, setFinalStartDate] = useState(start_date || '2024-01-01');
  const [finalEndDate, setFinalEndDate] = useState(end_date || '2024-01-02');

  const { data, error, loading } = useFetchNeoWs(finalStartDate, finalEndDate);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !data.near_earth_objects) {
    return <div>No data available for this date range.</div>;
  }

  return (
    <div className="neows-content">
      <h1 className="neows-title">
        Near-Earth Objects from {finalStartDate} to {finalEndDate}
      </h1>
      {Object.keys(data.near_earth_objects).map((date) => (
        <div key={date} className="neows-date">
          <h2>Date: {date}</h2>
          {Array.isArray(data.near_earth_objects[date])
            ? data.near_earth_objects[date].map((neo) => (
                <div key={neo.id} className="neows-object">
                  <p>Name: {neo.name}</p>
                  <p>Potentially Hazardous: {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
                  {neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour && (
                    <p>
                      Relative Velocity (km/h):{' '}
                      {parseFloat(
                        neo.close_approach_data[0].relative_velocity.kilometers_per_hour
                      ).toFixed(2)}
                    </p>
                  )}
                </div>
              ))
            : <div>No near-Earth objects found for this date.</div>}
        </div>
      ))}
    </div>
  );
};

export default NeoWsContent;
