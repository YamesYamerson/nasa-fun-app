// server.js
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001; // Use a different port from your frontend

const NASA_API_KEY = 'k5NkO2ahsJNV6D84ph5bDu04U5YPYE30WC5hfgnW'; // Your NASA API key

// Proxy endpoint for NASA APOD
app.get('/apod', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    );
    const data = await response.json();
    res.json(data); // Return fetched data to the client
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

// Proxy endpoint for NASA Mars Rover
app.get('/mars-rover', async (req, res) => {
  const { sol = 1000 } = req.query; // Default to sol 1000 if not specified
  try {
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${NASA_API_KEY}`
    );
    const data = await response.json();
    res.json(data.photos); // Return fetched photos to the client
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

// Proxy endpoint for NASA EPIC
app.get('/epic', async (req, res) => {
  const { date } = req.query; // Get the date from query parameters
  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }
  try {
    const response = await fetch(
      `https://epic.gsfc.nasa.gov/api/natural/date/${date}?api_key=${NASA_API_KEY}`
    );
    const data = await response.json();
    res.json(data); // Return fetched data to the client
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

// New endpoint for NeoWs (Near Earth Object Web Service)
app.get('/neows', async (req, res) => {
    const { start_date, end_date } = req.query; // Get the date range from query parameters
  
    try {
      const response = await fetch(
        `${NASA_NEOWS_URL}?start_date=${start_date}&end_date=${end_date}&api_key=${NASA_API_KEY}`
      ); // Fetch data from NeoWs with the specified date range and API key
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Parse the JSON response
      res.json(data); // Return fetched data to the client
    } catch (err) {
      console.error('Error fetching NeoWs data:', err); // Log errors
      res.status(500).send('Error fetching NeoWs data'); // Send error response
    }
  });

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
