import { app, httpServer } from "../index.js";
import Chat from "../models/chats.js";
import { decryptUserToken } from "../utils/common.js";
import { io } from "../index.js";

const connectedSockets = new Set();

export const getChat = async (firstUser, secondUser) => {
    
    const senderId = decryptUserToken(firstUser);
    const receiverId = decryptUserToken(secondUser);
    
    let chat = await findChat(senderId, receiverId);
    console.log("SOMETHING")

    io.on("connection", (socket) => {

        socket.join(senderId);

        if(!connectedSockets.has(socket.id)) {
            connectedSockets.add(socket.id);
    
            console.log("USER CONNECTED!", connectedSockets);
    
            socket.on("private message", (msg) => {
                if(!chat) {
                    chat = createChat(senderId, receiverId);
                }

                socket.to(senderId).to(receiverId).emit("private message", {
                    from: firstUser,
                    content: msg
                });

                // saving it on db 

                console.log("THIS IS THE MESSAGE! -> ", msg);
            })
    
            socket.on('disconnect', () => {
                console.log('USER DISCONNECTED!');
    
                connectedSockets.delete(socket.id);
            });
        } else {
            console.log("this client is already connected ! ", socket.id);
        }
    });
    
    if(!httpServer.listening) {
        httpServer.listen(5001, () => {
            console.log("HTTP SERVER CREATED!");
            
        });
    }
}

export const createRoom = () => {

}

export const createChat = (userId1, userId2) => {
    const chat = new Chat({
        _id: userId1 + ";" + userId2
    });

    chat.save();

    return chat;
}

const findChat = (userId1, userId2) => {
    const chat = Chat.findOne(userId1 + ";" + userId2)
        .then(chat => {
            if(chat) return chat;
        })
        .catch(err => {
            console.log("No such chat created yet", err);
            return null;
        })
}