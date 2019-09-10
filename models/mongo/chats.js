
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    author: String,
    message: String,
    taskId: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Chats = mongoose.model("Chats", ChatSchema);

module.exports = Chats;
