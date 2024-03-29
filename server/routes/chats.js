import express from 'express';
import { createChat, getChat } from '../controllers/chats.js';

const router = express.Router();

router.post('/open_chat', (req, res) => {
    const sender = req.body.sender.toString();
    const receiver = req.body.receiver.toString();
    getChat(sender, receiver, res);
});
router.post('/create_chat', createChat);
router.post('/send_message');

export default router;