import React, { useState } from 'react';
import { useFetchInsight } from '../../helper/useFetchInsight'; // Custom hook for fetching InSight data

const InsightContent = () => {
  const [triggerFetch, setTriggerFetch] = useState(false); // State to trigger data fetching
  const [selectedSol, setSelectedSol] = useState(''); // State for the selected Sol

  // Fetch data with default parameters
  const { data, error, loading } = useFetchInsight(
    { feedtype: 'json', ver: '1.0', api_key: 'YOUR_API_KEY' }, // Insert your NASA API key
    triggerFetch
  );

  // Toggle the triggerFetch state to fetch data
  const handleFetchData = () => {
    setTriggerFetch((prev) => !prev); // Trigger data fetching
  };

  // Function to change the selected Sol
  const handleSolChange = (e) => {
    setSelectedSol(e.target.value); // Update the selected Sol
    setTriggerFetch(true); // Trigger fetching for the new Sol
  };

  return (
    <div>
      <h2>InSight Mars Weather Data</h2> {/* Component title */}

      {/* Button to trigger fetching */}
      <button onClick={handleFetchData}>Fetch Mars Weather Data</button>

      {/* Dropdown to select Sol */}
      {data?.sol_keys?.length ? (
        <select value={selectedSol} onChange={handleSolChange}>
          {data.sol_keys.map((sol) => (
            <option key={sol} value={sol}>
              Sol {sol}
            </option>
          ))}
        </select>
      ) : (
        <p>No Sols available.</p> // Fallback if there are no Sol keys
      )}

      {/* Display loading state */}
      {loading && <p>Loading data, please wait...</p>}

      {/* Display error message if any */}
      {error && (
        <div style={{ color: 'red' }}> {/* Display error in red for visibility */}
          <p>Error: {error}</p>
        </div>
      )}

      {/* Display fetched data */}
      {selectedSol && data?.[selectedSol] ? (
        <div>
          <h3>Sol {selectedSol}</h3> {/* Display the selected Sol */}

          {/* Display temperature if available */}
          {data[selectedSol]?.AT ? (
            <div>
              <strong>Temperature (°C):</strong> {data[selectedSol.AT.av]}
            </div>
          ) : (
            <p>Temperature data unavailable for Sol {selectedSol}.</p> // Fallback message
          )}

          {/* Display pressure if available */}
          {data[selectedSol]?.PRE ? (
            <div>
              <strong>Pressure (Pa):</strong> {data[selectedSol.PRE.av]}
            </div>
          ) : (
            <p>Pressure data unavailable for Sol {selectedSol}.</p> // Fallback message
          )}

          {/* Display wind speed if available */}
          {data[selectedSol]?.HWS ? (
            <div>
              <strong>Wind Speed (m/s):</strong> {data[selectedSol.HWS.av]}
            </div>
          ) : (
            <p>Wind speed data unavailable for Sol {selectedSol}.</p> // Fallback message
          )}

          {/* Display wind direction if available */}
          {data[selectedSol]?.WD?.most_common ? (
            <div>
              <strong>Wind Direction:</strong> {data[selectedSol.WD.most_common.compass_point]}
            </div>
          ) : (
            <p>Wind direction data unavailable for Sol {selectedSol}.</p> // Fallback message
          )}
        </div>
      ) : (
        <p>No data available for the selected Sol.</p> // Fallback message when Sol has no data
      )}

      {/* Provide external links for more information on missing data */}
      <p>
        Learn more about missing data and InSight's power management:
        <a href="https://mars.nasa.gov/insight/weather/">InSight Weather Report</a>
        |
        <a href="https://mars.nasa.gov/insight/news/">InSight News</a>
      </p>
    </div>
  );
};

export default InsightContent;
