import React, { useState } from 'react';
import { useFetchEarth } from '../../helper/useFetchEarth';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet styles

const EarthContent = () => {
  const [latitude, setLatitude] = useState(34.0522); // Initial latitude
  const [longitude, setLongitude] = useState(-118.2437); // Initial longitude
  const [date, setDate] = useState(''); // Date state
  const [triggerFetch, setTriggerFetch] = useState(false); // Trigger for manual fetch

  const { data, error, loading } = useFetchEarth('imagery', {
    lat: latitude,
    lon: longitude,
    date,
  }, triggerFetch); // Using triggerFetch to re-fetch data upon form submission

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior
    setTriggerFetch((prev) => !prev); // Toggle triggerFetch to initiate a new fetch
  };
  

  return (
    <div>
      <h2>Earth Imagery Data</h2>

      {/* User input form for coordinates and date */}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            step="0.01"
            value={latitude}
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            step="0.01"
            value={longitude}
            onChange={(e) => setLongitude(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Date (YYYY-MM-DD):</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Fetch Image</button>
      </form>

      {/* Handling loading and error states */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Display fetched data */}
      {data && (
        <>
          <p>Date: {data.date}</p>
          <img src={data.url} alt="Satellite imagery" />
        </>
      )}

      {/* Interactive map for coordinate selection */}
      <MapContainer
        center={[latitude, longitude]}
        zoom={10}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[latitude, longitude]}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const newCoords = e.target.getLatLng(); // Get new coordinates when marker is dragged
              setLatitude(newCoords.lat); // Update latitude
              setLongitude(newCoords.lng); // Update longitude
            },
          }}
        />
      </MapContainer>
    </div>
  );
};

export default EarthContent;
