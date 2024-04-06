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

const redisClient = await createClient();

redisClient.on("connect", () => {
    console.log("CONNECTED TO REDIS");
})

redisClient.on('error', err => console.log('Redis Client Error', err));

const sessionStore = new RedisSessionStore(redisClient);

export const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        // methods: ["GET", "POST"]
    }
});

io.use(async (socket, next) => {
    const userToken = socket.handshake.auth.sender;
    const receiverId = socket.handshake.auth.receiver;
    
    if(userToken) {
        console.log("user token for search -> ", userToken);
        const session = await sessionStore.findSession(userToken);

        if(session && session.userToken) {
            console.log("SESSION FOUND! -> ", session.userId);
            socket.userId = session.userId;
            socket.userToken = session.userToken;
            socket.receiverId = session.receiverId;
            
            return next();
        }
    }

    const userId = await decryptUserToken(userToken);

    sessionStore.saveSession(userToken, userId, socket.id, true);
    socket.userId = userId;

    console.log("SOCKET ID ---------------> ", socket.id);

    next();

})

io.on("connection", (socket) => {
    socket.join(socket.userToken);

    socket.to(socket.id).emit("bababu", { content: "hi" });

    console.log("USER CONNECTED TO SOCKET -> ", socket.userId);

    socket.on("private_message", async (msg) => {

        const receiverSession = await sessionStore.findSession(msg.receiver);
        
        console.log("RECEIVER ID ON PRIV MSG -> ", receiverSession);

        if(receiverSession) {
            socket.to(socket.id).to(receiverSession.socketId).emit("private_message", { content: msg.content })
        } else {
            socket.to(socket.userToken).emit("private_message", { content: msg.content });
        }
        
        console.log("Private message -> ", msg);
    });

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
