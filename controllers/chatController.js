const mongo = require("../models");

module.exports = {
  
  findByTaskId(req, res) {

    mongo.Chats.find({taskId: req.params.taskId}).sort({day: 1,hours: 1, minutes: 1})
      .then(mongoChats => res.json(mongoChats))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  saveChat(req, res) {
      console.log(req.body)
    mongo.Chats.create(req.body)
      .then(mongoChats => res.json(mongoChats))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  
};
