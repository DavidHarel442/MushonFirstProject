const { logChatMessage } = require('./Chat'); // Import the logChatMessage function

// Middleware to log HTTP requests and responses
const logHttpRequestsAndResponses = () => {
  return async (req, res, next) => {
    const email = req.body.email || 'unknown user';
    const userRequest = {
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
    };

    // Temporarily hold the response details
    const originalSend = res.send.bind(res);
    let responseBody;

    res.send = function (data) {
      responseBody = data;
      return originalSend(data);
    };

    // After the response is sent
    res.on('finish', async () => {
      const httpResponse = {
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        headers: res.getHeaders(),
        body: responseBody,
      };

      // Log the chat message with the HTTP request and response
      try {
        await logChatMessage(email, userRequest, httpResponse);
      } catch (error) {
        console.error('Error logging chat message:', error);
      }
    });

    next();
  };
};

module.exports = logHttpRequestsAndResponses;