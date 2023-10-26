const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 8080;
const apiKey = '55f45996a84706946ffe7f4204db6f9a';

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/request', async (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.status(400).json({ error: 'Location parameter missing' });
  }

  try {
    const weatherResponse = await axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`);
    const weatherData = weatherResponse.data;
    
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.get('/test', async (req, res) => {
  console.log("Hola");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});