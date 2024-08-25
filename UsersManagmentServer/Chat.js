const mongoose = require('mongoose');
const Users = require('./models/Users'); // Import the Users model
const Chat = require('./models/ChatHistories');   // Import the Chat model

async function logChatMessage(email, userRequest, httpResponse) {
  try {
    // Retrieve the userId from the Users collection based on the email
    const user = await Users.findOne({ email });

    if (!user) {
      console.error('User not found.');
      return;
    }

    const userId = user.email; // Extract the userId

    // Find the most recent chat document by userId
    let chatDoc = await Chat.findOne({ userId }).sort({ createdAt: -1 });

    if (!chatDoc) {
      // Create a new chat document if it doesn't exist
      chatDoc = new Chat({
        chatId: `${userId}-${Date.now()}`,
        userId,
        chat: [{ request: userRequest, response: httpResponse }]
      });
    } else {
      // Append the new request/response pair to the existing chat
      chatDoc.chat.push({ request: userRequest, response: httpResponse });
    }

    // Save the updated document
    await chatDoc.save();
    console.log('Chat log updated successfully.');

  } catch (err) {
    console.error('Error updating chat log:', err);
  }
}

module.exports = { logChatMessage }; // Export the function
