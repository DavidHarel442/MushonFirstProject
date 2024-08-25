// newMessages.js
const express = require('express');
const router = express.Router();
const { logChatMessage } = require('./Chat'); // Import the logChatMessage function

// Middleware to parse JSON
router.use(express.json());

// Route to handle incoming messages
router.post('/messages', async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).send({ error: 'Email and message are required.' });
    }

    const userRequest = {
      method: 'POST',
      url: '/messages',
      headers: req.headers,
      body: req.body,
    };

    const httpResponse = {
      statusCode: 200,
      statusMessage: 'OK',
      headers: res.getHeaders(),
      body: 'Message received',
    };

    // Log the chat message with the HTTP request and response
    await logChatMessage(email, userRequest, httpResponse);

    // Send a response
    res.status(200).send('Message received successfully.');
  } catch (error) {
    console.error('Error handling message:', error);
    res.status(500).send({ error: 'An error occurred while processing your request.' });
  }
});

module.exports = router;