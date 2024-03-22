import express from 'express';
import { createChat, getChat } from '../controllers/chats.js';

const router = express.Router();

router.post('/open_chat', (req, res) => {
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    getChat(sender, receiver);
});
router.post('/create_chat', createChat);
router.post('/send_message');

export default router;