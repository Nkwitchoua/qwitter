import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    message: String,
    authorId: String,
    tags: [String],
    selectedFiles: [String],
    likeCount: {
        type: Number,
        default: 0
    },
    retweetCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;