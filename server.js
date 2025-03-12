const express = require('express');
const app = express();
const port = 80;
const path = require('path');

// Sample data to represent devices
let devices = [
  { name: "Living Room Light", state: false, id: 1 },
  { name: "Kitchen Light", state: false, id: 2 },
  { name: "Bedroom Fan", state: false, id: 3 },
  { name: "TV", state: false, id: 4 }
];

// Middleware to parse query parameters
app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

// Endpoint to get the current state of devices
app.get('/devices', (req, res) => {
  res.json(devices);
});

// Endpoint to change the state of a device
app.get('/changeState', (req, res) => {
  const { id, state } = req.query;

  // Validate input
  if (id === undefined || state === undefined) {
    return res.status(400).json({ error: 'Missing id or state parameter' });
  }

  const deviceId = parseInt(id);
  const newState = state === 'true'; // Convert 'true' or 'false' string to boolean

  // Find the device by id and update its state
  const device = devices.find(device => device.id === deviceId);
  if (device) {
    device.state = newState;
    res.json(device); // Return the updated device
  } else {
    res.status(404).json({ error: 'Device not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
