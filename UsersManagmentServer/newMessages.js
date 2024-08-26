const express = require('express');
const { logChatMessage, getChatHistory } = require('./Chat');
const router = express.Router();

router.post('/messages', async (req, res) => {
    console.log('Received message request:', req.body);
    const { email, message, chatId } = req.body;

    if (!email || !message) {
        return res.status(400).send({ error: 'Email and message are required.' });
    }

    const userRequest = message;
    const botResponse = "Continue later"; // Placeholder bot response

    try {
        const { chatId: newChatId, isNewChat } = await logChatMessage(email, userRequest, botResponse, chatId);
        console.log('Message logged successfully:', { newChatId, isNewChat });
        res.status(200).send({ 
            message: isNewChat ? 'New chat created and message logged successfully.' : 'Message logged successfully.', 
            chatId: newChatId
        });
    } catch (error) {
        console.error('Error in /messages route:', error);
        res.status(500).send({ error: 'Failed to log the message.', details: error.message, stack: error.stack });
    }
});

router.get('/chat-history', async (req, res) => {
    console.log('Received chat history request:', req.query);
    const { email, chatId } = req.query;

    if (!email || !chatId) {
        return res.status(400).send({ error: 'Email and chatId are required.' });
    }

    try {
        const chatHistory = await getChatHistory(email, chatId);
        if (chatHistory) {
            res.status(200).send(chatHistory);
        } else {
            res.status(404).send({ message: 'Chat history not found.' });
        }
    } catch (error) {
        console.error('Error in /chat-history route:', error);
        res.status(500).send({ error: 'Failed to retrieve chat history.', details: error.message });
    }
});

module.exports = router;