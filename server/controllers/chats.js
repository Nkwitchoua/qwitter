import { Server } from "socket.io";
import { app, httpServer } from "../index.js";

var io = null;
const connectedSockets = new Set();

export const getChat = (chatId) => {
    console.log("GET CHAT FIRED!!!");

    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000", // Разрешить доступ только с этого источника
            methods: ["GET", "POST"] // Разрешенные методы
        }
    });

    io.on("connection", (socket) => {
        if(!connectedSockets.has(socket.id)) {
            connectedSockets.add(socket.id);

            console.log("USER CONNECTED!");

            socket.on("chat message", (msg) => {
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

    console.log(httpServer.listening);
    
    if(!httpServer.listening) {
        httpServer.listen(3001, () => {
            console.log("HTTP SERVER CREATED!")
            
        });
    }
}

export const createChat = (userId1, userId2) => {

}