const mongo = require("../models");

module.exports = {
  
  findByTaskId(req, res) {
    console.log(req.params.taskId)
    mongo.Mails.find({taskId: req.params.taskId})
      .then(mongoMails => res.json(mongoMails))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  saveMail(req, res) {
    mongo.Mails.create(req.body)
      .then(mongoMails => res.json(mongoMails))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  
};
