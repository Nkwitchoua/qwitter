import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tagname: {
        type: String,
        required: true
    },
    avatar: String,
    backgroundImage: String,
    birthDate: Date,
    subscribersCount: {
        type: Number,
        default: 0
    },
    subscribedCount: {
        type: Number,
        default: 0
    },
    subscribers: [String],
    subscribed: [String],
    description: String,
}, {
    timestamps: true,
    collection: "users"
});

const User = mongoose.model('User', userSchema);

export default User;