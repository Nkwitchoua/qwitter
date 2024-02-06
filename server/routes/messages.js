import express from 'express';
import { createChat, getChat } from '../controllers/chats.js';
import { searchUsers } from '../controllers/messages.js';

const router = express.Router();

router.get('/search_users', searchUsers);

export default router;