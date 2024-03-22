import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    users: [String],
    messages: [
        {
            text: String,
            date: {
                type: Date,
                default: new Date()
            },
            author: String,
            viewed: {
                type: Boolean,
                default: false
            },
            edited: {
                type: Boolean,
                default: false
            }
        }
    ]
});

const Room = mongoose.model('Room', roomSchema);

export default Room;