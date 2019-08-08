
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    author: String,
    message: String,
    taskId: String,
    month:Number,
    day:Number,
    hours:Number,
    minutes:Number
});

const Chats = mongoose.model("Chats", ChatSchema);

module.exports = Chats;
