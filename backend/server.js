// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // Import the cors package

const app = express();
const PORT = 3001; // Port for the Express server

const NASA_API_KEY = 'k5NkO2ahsJNV6D84ph5bDu04U5YPYE30WC5hfgnW'; // Your NASA API key
const NASA_NEOWS_URL = 'https://api.nasa.gov/neo/rest/v1/feed'; // Base URL for NeoWs API

// Enable CORS for the entire server
app.use(cors()); // Allow cross-origin requests from any origin

// Endpoint for NASA APOD
app.get('/apod', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}` // Fetch APOD data
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Parse the JSON response
    res.json(data); // Return the fetched data
  } catch (err) {
    console.error('Error fetching APOD data:', err); // Log the error
    res.status(500).send('Error fetching APOD data'); // Send error response
  }
});

// Endpoint for NASA Mars Rover
app.get('/mars-rover', async (req, res) => {
  const { sol = 1000 } = req.query; // Get the sol parameter
  try {
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${NASA_API_KEY}` // Fetch Mars Rover photos
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Parse the JSON response
    res.json(data.photos); // Return the photos
  } catch (err) {
    console.error('Error fetching Mars Rover data:', err); // Log the error
    res.status(500).send('Error fetching Mars Rover data'); // Send error response
  }
});

// Endpoint for NASA EPIC
app.get('/epic', async (req, res) => {
  const { date } = req.query; // Get the date parameter
  if (!date) {
    return res.status(400).json({ error: 'Date is required' }); // Validate input
  }
  try {
    const response = await fetch(
      `https://epic.gsfc.nasa.gov/api/natural/date/${date}?api_key=${NASA_API_KEY}` // Fetch EPIC data
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Parse the JSON response
    res.json(data); // Return the fetched data
  } catch (err) {
    console.error('Error fetching EPIC data:', err); // Log the error
    res.status(500).send('Error fetching EPIC data'); // Send error response
  }
});

// Endpoint for NeoWs (Near Earth Object Web Service)
app.get('/neows', async (req, res) => {
  const { start_date, end_date } = req.query; // Get the date range
  if (!start_date || !end_date) {
    return res.status(400).json({ error: 'Start date and end date are required' }); // Validate input
  }
  try {
    const response = await fetch(
      `${NASA_NEOWS_URL}?start_date=${start_date}&end_date=${end_date}&api_key=${NASA_API_KEY}` // Fetch NeoWs data
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Parse the JSON response
    res.json(data); // Return the fetched data
  } catch (err) {
    console.error('Error fetching NeoWs data:', err); // Log the error
    res.status(500).send('Error fetching NeoWs data'); // Send error response
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Confirm server is running
});
