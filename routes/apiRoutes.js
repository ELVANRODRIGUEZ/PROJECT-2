var db = require("../models").db;
var connection = require("../models").connection;
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed

    res.json("/members");
    // res.send("Hi!");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.users.create({
      user_name: req.body.userName,
      phone_number: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      //   if(err.parent.code=="ER_DUP_ENTRY"){

      //     $("#alert .msg").text("email already exists");
      // $("#alert").fadeIn(500);
      //   }
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        name: req.user.user_name
      });
    }
  });

  // ==========================================================================

  // Route for getting some data about our user to be used client side
  app.get("/api/all_users/find_user/:user_data", function (req, res) {
    if (!req.params.user_data) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.users.findOne({
        where: {
          user_name: req.params.user_data
        },
        attributes: ["id", "user_name", "email"]
      }).then(function (user) {

        var userData = {
          id: user.id,
          name: user.user_name,
          email: user.email
        }

        res.json(userData);

      });

    }

  });

  // Route for getting all users data but just show part of it.
  app.get("/api/all_users", function (req, res) {

    db.users.findAll({
      attributes: ["id", "user_name", "email"]
    }).then(function (users) {

      res.json(users);

    });

  });

  // Route for getting all projects related to a user (with the task category included).
  app.post("/api/user_projects", function (req, res) {

    var currentUser;

    db.users.findOne({
      attributes: [
        ["user_name", "user"]
      ],
      where: {
        id: 5
      },
      include: [{
        model: db.tasks,
        attributes: [
          ["id", "id"],
          ["description", "description"]
        ],
        include: [{
          model: db.categories,
          attributes: [
            ["category_name", "category"]
          ]
        }]
      }]
    }).then(function (users) {

      res.json(users);

    });

  });

  // Route for getting all projects tasks.
  app.post("/api/user_projects", function (req, res) {

    var currentUser;

    db.users.findOne({
      attributes: [
        ["user_name", "user"]
      ],
      where: {
        id: 5
      },
      include: [{
        model: db.tasks,
        attributes: [
          ["id", "id"],
          ["description", "description"]
        ],
        include: [{
          model: db.categories,
          attributes: [
            ["category_name", "category"]
          ]
        }]
      }]
    }).then(function (users) {

      res.json(users);

    });

  });

  app.get("/api/test", function (req, res) {

    var id = 4;

    var query =
      'SELECT ' +
      'up.user as "user", ' +
      'up.user_id as "user_id", ' +
      'up.project as "projects", ' +
      'up.project_id as "projects_id", ' +
      'tc.category as "category", ' +
      'tc.category_id as "category_id", ' +
      'upt.task_description as "tasks", ' +
      'upt.task_id as "tasks_id" ' +
      'FROM ' +
      '(SELECT u.user_name as "user", ' +
      'u.id as "user_id", ' +
      'p.project_name as "project", ' +
      'p.id as "project_id" ' +
      'FROM users u ' +
      'LEFT JOIN project_users pu ' +
      'ON u.id = pu.user_name JOIN projects p ON p.id = pu.project_name WHERE u.id = 4) up ' +
      'LEFT JOIN ' +
      '(SELECT u.id as "user", ' +
      'tr.task_id as "task_id", ' +
      't.task_project as "task_project_id", ' +
      't.description as "task_description" ' +
      'FROM users u LEFT JOIN tasks_responsibles tr ON tr.responsible = u.id LEFT JOIN tasks t ' +
      'ON t.id = tr.task_id WHERE u.id = 4) upt ' +
      'ON upt.task_project_id = up.project_id ' +
      'LEFT JOIN ' +
      '(SELECT c.id as "category_id", ' +
      'c.description as "category", ' +
      't.id as "task_id", ' +
      't.description as "task" ' +
      'FROM categories c LEFT JOIN tasks t ' +
      'ON t.task_category = c.id) tc ' +
      'ON upt.task_id = tc.task_id'

    // res.send(console.log(connection));

    connection.query(query, function (err, data) {

      if (err) throw err;

      res.send(data);

    });

  });

};