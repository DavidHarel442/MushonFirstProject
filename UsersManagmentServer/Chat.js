const Users = require('./models/Users');
const ChatHistories = require('./models/ChatHistories');

async function logChatMessage(email, userRequest, botResponse, chatId) {
  try {
    console.log('Logging chat message:', { email, userRequest, botResponse, chatId });

    if (!email || !userRequest) {
      throw new Error('Email and userRequest are required');
    }

    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error('User not found.');
    }

    const userId = user.email;

    const newMessage = {
      request: userRequest,
      response: botResponse || 'No response yet'
    };

    console.log('New message to be added:', newMessage);

    let result = await ChatHistories.findOne({ userId });
    let isNewChat = false;

    if (!result) {
      // Create new document if it doesn't exist
      chatId = chatId || `${userId}-${Date.now()}`;
      result = new ChatHistories({
        userId,
        chats: [{ chatId, messages: [newMessage] }]
      });
      isNewChat = true;
    } else {
      if (!chatId) {
        // Create a new chat
        chatId = `${userId}-${Date.now()}`;
        result.chats.push({ chatId, messages: [newMessage] });
        isNewChat = true;
      } else {
        // Find existing chat or create new one if chatId doesn't exist
        let chat = result.chats.find(c => c.chatId === chatId);
        if (!chat) {
          chat = { chatId, messages: [] };
          result.chats.push(chat);
          isNewChat = true;
        }
        chat.messages.push(newMessage);
      }
    }

    await result.save();

    console.log('Updated chat history:', JSON.stringify(result, null, 2));

    return { chatId, isNewChat };

  } catch (err) {
    console.error('Error in logChatMessage:', err);
    throw err;
  }
}

async function getChatHistory(email, chatId) {
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error('User not found.');
    }

    const chatHistory = await ChatHistories.findOne(
      { userId: user.email, 'chats.chatId': chatId },
      { 'chats.$': 1 }
    );

    return chatHistory && chatHistory.chats[0] ? chatHistory.chats[0].messages : null;

  } catch (err) {
    console.error('Error retrieving chat history:', err);
    throw err;
  }
}

module.exports = { logChatMessage, getChatHistory };