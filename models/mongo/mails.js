const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// define our mail schema

const MailSchema = new Schema({
 

  senderName: String,   
  senderEmail: String,
  email: String,
                mailSubject: String,
                message: String,
                taskId: {
                  type: String,
                  default: "1"
                },
                createdAt:{
                  type: Date,
                  default: Date.now
                }
});

// create our model using mongoose and the schema we just created
const Mails = mongoose.model("Mails",MailSchema);

module.exports = Mails;
