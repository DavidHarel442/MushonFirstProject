const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatHistoriesSchema = new Schema({
    chatId: String,
  userId: String,
  chat: [
    {
      request: Object,   // Store the entire request object
      response: Object   // Store the entire response object
    }
  ]
},{timestamps: true});

const chat = mongoose.model('chathistories',ChatHistoriesSchema);
module.exports = chat;