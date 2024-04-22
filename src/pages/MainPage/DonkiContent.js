import React, { useState } from 'react';
import useFetchDONKI from '../../functions/useFetchDONKI'; // Importing the custom hook
import './DonkiContent.css';

const DonkiContent = () => {
  // State for the start and end dates, and selected data type
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-02');
  const [dataType, setDataType] = useState('CME'); // Default data type

  // Using the custom hook to fetch DONKI data
  const { data, loading, error } = useFetchDONKI(dataType, startDate, endDate);

  // Handling loading and errors
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>DONKI Space Weather Data</h1>

      {/* Data type selection */}
      <select value={dataType} onChange={(e) => setDataType(e.target.value)}>
        <option value="CME">Coronal Mass Ejection (CME)</option>
        <option value="GST">Geomagnetic Storm (GST)</option>
        <option value="IPS">Interplanetary Shock (IPS)</option>
        <option value="FLR">Solar Flare (FLR)</option>
        <option value="SEP">Solar Energetic Particle (SEP)</option>
        <option value="MPC">Magnetopause Crossing (MPC)</option>
        <option value="RBE">Radiation Belt Enhancement (RBE)</option>
        <option value="HSS">High Speed Stream (HSS)</option>
      </select>

      {/* Date input fields */}
      <div>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </div>

      {/* Displaying fetched data */}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <div>No data available for this date range.</div>
      )}
    </div>
  );
};

export default DonkiContent;
