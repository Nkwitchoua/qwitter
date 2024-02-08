import User from "../models/user.js";
import { MongoClient } from "mongodb";

const CONNECTION_URL = process.env.DATABASE;
// const client = new MongoClient(CONNECTION_URL);

export const searchUsers = async (req, res) => {
    const query = req.query.query;

    const pattern = new RegExp(query + ".*");

    const collection = User.collection;

    const docs = await User.find({ name: { $regex: pattern, $options: 'i'} }, { name: 1, avatar: 1 });

    res.status(200).json(docs);
}