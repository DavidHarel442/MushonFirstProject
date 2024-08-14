const mongoose = require('mongoose');
const express = require('express');
const Users = require('./models/Users');
const { createUserRoute } = require('./CreateUser'); // Import the route function
const cors = require('cors');


const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mushonApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});


createUserRoute(app);




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});