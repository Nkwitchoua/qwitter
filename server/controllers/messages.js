import User from "../models/user.js";
import { MongoClient } from "mongodb";
import { decryptUserToken } from "../utils/common.js";

const CONNECTION_URL = process.env.DATABASE;

export const searchUsers = async (req, res) => {
    const query = req.query.query;

    const pattern = new RegExp(query + ".*");

    const docs = await User.find({ name: { $regex: pattern, $options: 'i'} }, { name: 1, avatar: 1, token: 1 });

    res.status(200).json(docs);
}