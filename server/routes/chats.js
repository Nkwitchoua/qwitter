import express from 'express';
import { createChat, getChat } from '../controllers/chats.js';

const router = express.Router();

router.get('/get_chat', getChat);
router.post('/create_chat', createChat);
router.post('/send_message');

export default router;