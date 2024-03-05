import { Server } from "socket.io";
import { app, httpServer } from "../index.js";

var io = null;
const connectedSockets = new Set();

export const getChat = (chatId, firstUser, secondUser) => {
    let newChat = true;

    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000", // Разрешить доступ только с этого источника
            methods: ["GET", "POST"] // Разрешенные методы
        }
    });

    if(chatId) newChat = false;

    io.on("connection", (socket) => {
        if(!connectedSockets.has(socket.id)) {
            connectedSockets.add(socket.id);

            console.log("USER CONNECTED!", connectedSockets);

            socket.on("chat message", (msg) => {
                if(newChat) {



                    newChat = false;
                }
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
        httpServer.listen(3001, () => {
            console.log("HTTP SERVER CREATED!");
            
        });
    }
}

export const createChat = (userId1, userId2) => {

}