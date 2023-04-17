import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

const CONNECTION_URL = process.env.DATABASE;

console.log('CONNECTION URL ------> ', CONNECTION_URL);

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch((error) => console.log(error));

//mongoose.set("useFindAndModify", false);

