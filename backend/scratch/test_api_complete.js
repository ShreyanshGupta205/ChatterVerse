const jwt = require('jsonwebtoken');
const https = require('http');
require('dotenv').config();

const token = jwt.sign({ id: '69dd4a3e909f83136d09a912' }, process.env.JWT_SECRET);
console.log("Using token:", token);

const data = JSON.stringify({ message: "Hello from script", mood: "Chill Buddy" });

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/chat/69dd4a47909f83136d09a919', // Valid chat ID from DB
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'Authorization': `Bearer ${token}`
  }
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
