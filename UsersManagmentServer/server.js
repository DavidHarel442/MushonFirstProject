const mongoose = require('mongoose');
const express = require('express');
const { createUserRoute } = require('./CreateUser');
const newMessages = require('./newMessages');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Define routes
app.use('/api', newMessages);
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