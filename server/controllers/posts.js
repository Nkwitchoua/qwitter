import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();


        // console.log('post messages -> ', postMessages[0]);
        // console.log("getPosts check if we have SOME COOKIES -> ", req.headers.authorization);

        res.status(200).json(postMessages.reverse());
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