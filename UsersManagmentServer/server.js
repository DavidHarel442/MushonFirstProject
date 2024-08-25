const mongoose = require('mongoose');
const express = require('express');
const Users = require('./models/Users');
const { createUserRoute } = require('./CreateUser'); // Import the route function
const logHttpRequestsAndResponses = require('./logHttpRequestsAndResponses'); // Import the middleware
const newMessages = require('./newMessages'); // Import the new messages router
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Use the middleware to log HTTP requests and responses
app.use(logHttpRequestsAndResponses());

// Define routes
app.use('/api', newMessages); // Use the new messages router under the /api path
createUserRoute(app);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mushonApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});