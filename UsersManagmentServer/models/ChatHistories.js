const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  request: String,
  response: String
}, { timestamps: true });

const ChatSchema = new Schema({
  chatId: String,
  messages: [MessageSchema]
});

const ChatHistoriesSchema = new Schema({
  userId: String,
  chats: [ChatSchema]
}, {timestamps: true});

const ChatHistories = mongoose.model('chathistories', ChatHistoriesSchema);
module.exports = ChatHistories;