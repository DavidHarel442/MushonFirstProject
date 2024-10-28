const mongoose = require('mongoose');
const express = require('express');
const { createUserRoute } = require('./CreateUser');
const newMessages = require('./newMessages');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3000;
const path = require('path');  // Add this at the top with other requires

app.use(cors());
app.use(express.json());

app.use(express.static('public'));
// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Define routes
app.use('/api', newMessages);
createUserRoute(app);



// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Log the actual URI (but mask the password)
const maskedUri = process.env.MONGODB_URI ? 
  process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@') : 
  'undefined';
console.log('Attempting to connect with URI:', maskedUri);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});