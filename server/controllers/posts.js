import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json({
            posts: postMessages.reverse(),
            authData: res.authData,
            currentUser: res.currentUser
        });
    } catch(err) {
        res.status(404).json({ message: `Error in controller posts.js -> ${err}`});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch(err) {
        res.status(409).json({ message: `Error in createPost, controller posts.js -> ${err}`});
    }
}