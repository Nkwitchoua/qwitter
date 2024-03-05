import express from "express";
// import { getPosts, createPost } from "../controllers/posts.js";

const router = express.Router();

router.get('/messages');
router.post('/messages');

export default router;