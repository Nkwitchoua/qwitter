import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import chatRoutes from "./routes/chats.js";
import messagesRoutes from "./routes/messages.js";
import { checkToken } from "./middleware/checkToken.js";
import { createServer } from "http";
import { Server } from "socket.io";
import User from "./models/user.js";

export const app = express();
export const httpServer = createServer(app);

export let io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000", // Разрешить доступ только с этого источника
        methods: ["GET", "POST"] // Разрешенные методы
    }
});

app.use(cors({
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}));
app.use(cookieParser());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use((req, res, next) => {
    checkToken(req, res, next);
    
    next();
})

// app.use('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build", "index.html"));
//     console.log("worked")
// })

// console.log(path.join(__dirname, "../client/build", "index.html"))
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/messages', chatRoutes);
app.use('/messages', messagesRoutes);

const CONNECTION_URL = process.env.DATABASE;

console.log('CONNECTION URL ------> ', CONNECTION_URL);

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch((error) => console.log(error));

export const db = mongoose.Collection;

//mongoose.set("useFindAndModify", false);