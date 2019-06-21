var db = require("../models").db;
var connection = require("../models").connection;

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {

      res.redirect("/members");


    }
    //res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("login");

  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {

      res.redirect("/members");

    }

    res.render("signup");

  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {

    // test(function (data) {

    //   var userProfile = {
    //     userInfo: data
    //   }
    res.render("index");

    // })

  });

  app.get("/members/info", isAuthenticated, function (req, res) {
    // function test(cb) {

    var id = req.user.id;

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
      'ON u.id = pu.user_name JOIN projects p ON p.id = pu.project_name WHERE u.id = ' + id + ') up ' +
      'LEFT JOIN ' +
      '(SELECT u.id as "user", ' +
      'tr.task_id as "task_id", ' +
      't.task_project as "task_project_id", ' +
      't.description as "task_description" ' +
      'FROM users u LEFT JOIN tasks_responsibles tr ON tr.responsible = u.id LEFT JOIN tasks t ' +
      'ON t.id = tr.task_id WHERE u.id = ' + id + ') upt ' +
      'ON upt.task_project_id = up.project_id ' +
      'LEFT JOIN ' +
      '(SELECT c.id as "category_id", ' +
      'c.description as "category", ' +
      't.id as "task_id", ' +
      't.description as "task" ' +
      'FROM categories c LEFT JOIN tasks t ' +
      'ON t.task_category = c.id) tc ' +
      'ON upt.task_id = tc.task_id'
    var data1;

    connection.query(query, function (err, data) {

      if (err) throw err;

      data1 = data;
      // console.log(data1);
      res.json(data1);

      
    });
    
    // }

  });

};