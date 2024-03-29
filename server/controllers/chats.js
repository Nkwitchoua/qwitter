import { app } from "../index.js";
import Chat from "../models/chats.js";
import { createServer } from "http";
import { decryptUserToken } from "../utils/common.js";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { RedisSessionStore } from "../utils/sessionStore.js";

const httpServer = createServer();

if(!httpServer.listening) {
    httpServer.listen(5001, () => {
        console.log("HTTP SERVER CREATED!");
        
    });
}

const redisClient = createClient();


const sessionStore = new RedisSessionStore(redisClient);


export const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        // methods: ["GET", "POST"]
    }
});

const connectedSockets = new Set();

io.use(async (socket, next) => {
    const sessionId = socket.handshake.auth;
    console.log(sessionId)
    next();

})

io.on("connection", (socket) => {
    // socket.join(senderId);

    console.log("USER CONNECTED TO SOCKET -> ")

    socket.on("private message", (msg) => {
        // saving it on db 
    })

    socket.on('disconnect', () => {
        console.log('USER DISCONNECTED!');

    });
});

export const getChat = async (firstUser, secondUser, res) => {
    try {
        console.log("FIRST USER -----------> ", firstUser);
        const senderId = decryptUserToken(firstUser);
        const receiverId = decryptUserToken(secondUser);
        
        console.log("SOMETHING", senderId);

        let chat = await findChat(senderId, receiverId);
        let socket;
        
        return res.json();

    } catch(err) {
        console.log(err)
        return err;
    }
    
}

export const createRoom = () => {

}

export const createChat = (userId1, userId2) => {
    const chat = new Chat({
        chatId: userId1 + ";" + userId2
    });

    chat.save();

    return chat;
}

const findChat = async (userId1, userId2) => {
    try {
        const query = userId1 + ";" + userId2;

        const pattern = new RegExp(query);

        const chat = await Chat.find({ chatId: { $regex: pattern, $options: 'i'} }, { messages: 1 }).limit(1);
        console.log("CHAT FOUND !!!!!!!! ->>>", chat[0]);
        return chat[0] || null;
    } catch (err) {
        console.log("Error occurred while finding chat:", err);
        return null;
    }
}
