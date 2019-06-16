var db = require("../models");

module.exports = function(app) {
  // Get all users.
  app.get("/api/users", function(req, res) {

    db.users.findAll({}).then(function(users) {

      res.json(users);

    });

  });
  
  // Get a user.
  app.get("/api/:user", function(req, res) {
    
    var user = req.params.user;

    db.users.findOne({
      where: {user_name:user}
    }).then(function(users) {

      res.json(users);

    });

  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
