import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    text: String,
    author: String,
    date: {
        type: Date,
        default: new Date()
    },
    liked: {
        type: Boolean,
        default: false
    },
    unread: {
        type: Boolean,
        default: true
    },
});

const chatSchema = mongoose.Schema({
    users: [String],
    chatId: String,
    messages: {
        type: [messageSchema],
        default: []
    }
});


const Chat = mongoose.model('Chat', chatSchema);

export default Chat;