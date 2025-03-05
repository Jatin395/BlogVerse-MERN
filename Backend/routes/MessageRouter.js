const Message = require('../modules/Message');
const express = require('express');
const MessageRouter = express.Router();
const { createMessage, DeleteMessage, UserMessage, BlogComment } = require('../Controllers/MessageController');
const isAuthicated = require('../middleware/Authmiddleware');

MessageRouter.post('/create', isAuthicated, createMessage);
MessageRouter.post('/delete/:id', isAuthicated, DeleteMessage);
MessageRouter.post('/user-get', isAuthicated, UserMessage);
MessageRouter.post('/view/:id', BlogComment);

module.exports = MessageRouter