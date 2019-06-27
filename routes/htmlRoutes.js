// =================================== Require db connection and models

var db = require("../models").db;
var connection = require("../models").connection;
var moment = require("moment");


// =================================== Require hardcoded templates.

var taskModal = require("../hardcoded-templates/taskModal-templete");
var userProfile = require("../hardcoded-templates/project-templete.js");
var categoryCard = require("../hardcoded-templates/category-templete.js");

// =================================== Requiring our custom middleware for checking if a user is logged in.

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

    var testHbsObject = {
      task_id: 40
    };

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
      'up.project_description as "project_description", ' +
      'up.project_id as "projects_id", ' +
      'tc.category as "category", ' +
      'tc.category_id as "category_id", ' +
      'upt.task_description as "tasks", ' +
      'upt.task_id as "tasks_id" ' +
      'FROM ' +
      '(SELECT u.user_name as "user", ' +
      'u.id as "user_id", ' +
      'p.project_name as "project", ' +
      'p.description as "project_description", ' +
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

    connection.query(query, function (err, data) {

      if (err) throw err;

      // console.log(data);

      // Getting the User Name of the query and formatting as html.

      var userName = userProfile.userNameTag(data[0].user)

      var allProjects = "";

      // Getting all the proyects from the query and formatting as html.
      // We need evaluation to not add an already added project while creating the html string.

      var project = "first";

      data.forEach(function (item) {

        if (project !== item.projects_id) {

          project = item.projects_id;

          allProjects += userProfile.projectCard(item.projects_id, item.projects, item.project_description);

        };

      });

      // Creating a JSON object to send as response.

      var sentResponse = {
        projectsHtml: allProjects,
        userTagHtml: userName,
        user_id: data[0].user_id,
        user_name: data[0].user
      }

      // Sendig response.

      res.send(sentResponse);

    });

    // }

  });

  app.get("/members/info/:projectId", isAuthenticated, function (req, res) {
    // function test(cb) {

    var userId = req.user.id;
    var projectId = req.params.projectId;

    var query =
      'SELECT ' +
      'up.user as "user", ' +
      'up.user_id as "user_id", ' +
      'up.project as "projects", ' +
      'up.project_description as "project_description", ' +
      'up.project_id as "projects_id", ' +
      'tc.category_name as "category_name", ' +
      'tc.category_description as "category_description", ' +
      'tc.category_id as "category_id" ' +
      'FROM ' +
      '(SELECT ' +
      'u.user_name as "user", ' +
      'u.id as "user_id", ' +
      'p.project_name as "project", ' +
      'p.description as "project_description", ' +
      'p.id as "project_id" ' +
      'FROM users u ' +
      'LEFT JOIN project_users pu ON u.id = pu.user_name ' +
      'JOIN projects p ON p.id = pu.project_name ' +
      'WHERE u.id = ' + userId + ' AND p.id = ' +
      projectId + ') up ' +
      'LEFT JOIN ' +
      '(SELECT ' +
      'u.id as "user", ' +
      'tr.task_id as "task_id", ' +
      't.task_project as "task_project_id", ' +
      't.description as "task_description" ' +
      'FROM users u ' +
      'LEFT JOIN tasks_responsibles tr ON tr.responsible = u.id ' +
      'LEFT JOIN tasks t ON t.id = tr.task_id ' +
      'WHERE u.id = ' + userId + ') upt ' +
      'ON upt.task_project_id = up.project_id ' +
      'LEFT JOIN ' +
      '(SELECT ' +
      'c.id as "category_id", ' +
      'c.category_name as "category_name", ' +
      'c.description as "category_description", ' +
      't.id as "task_id", ' +
      't.description as "task" ' +
      'FROM categories c ' +
      'LEFT JOIN tasks t ON t.task_category = c.id) tc ' +
      'ON upt.task_id = tc.task_id ' +
      'WHERE category_id IS NOT NULL ' +
      'GROUP BY category_id'

    connection.query(query, function (err, data) {

      if (err) throw err;

      // console.log(data);

      res.json(data);


    });

  });

  app.get("/members/info/category/:categoryId", isAuthenticated, function (req, res) {
    // function test(cb) {

    var userId = req.user.id;
    var categoryId = req.params.categoryId;

    // console.log(userId);
    // console.log(categoryId);

    var query =
      'SELECT ' +
      'up.user, ' +
      'up.user_id, ' +
      'up.project, ' +
      'up.project_id, ' +
      'tc.category, ' +
      'tc.category_id, ' +
      'upt.task_description, ' +
      'upt.task_deadline, ' +
      'upt.task_accomplished, ' +
      'upt.task_id ' +
      'FROM ' +
      '(SELECT ' +
      'u.user_name as "user", ' +
      'u.id as "user_id", ' +
      'p.project_name as "project", ' +
      'p.id as "project_id" ' +
      'FROM users u ' +
      'LEFT JOIN project_users pu ON u.id = pu.user_name ' +
      'JOIN projects p ON p.id = pu.project_name ' +
      'WHERE u.id = ' + userId + ') up ' +
      'LEFT JOIN ' +
      '(SELECT ' +
      'u.id as "user", ' +
      'tr.task_id as "task_id", ' +
      't.task_project as "task_project_id", ' +
      't.description as "task_description", ' +
      't.dead_line as "task_deadline", ' +
      't.accomplished as "task_accomplished" ' +
      'FROM users u ' +
      'LEFT JOIN tasks_responsibles tr ON tr.responsible = u.id ' +
      'LEFT JOIN tasks t ON t.id = tr.task_id ' +
      'WHERE u.id = ' + userId + ') upt ' +
      'ON upt.task_project_id = up.project_id ' +
      'LEFT JOIN ' +
      '(SELECT ' +
      'c.id as "category_id", ' +
      'c.description as "category", ' +
      't.id as "task_id", ' +
      't.description as "task" ' +
      'FROM categories c ' +
      'LEFT JOIN tasks t ON t.task_category = c.id) tc ' +
      'ON upt.task_id = tc.task_id ' +
      'WHERE category_id = ' + categoryId + ';'

    connection.query(query, function (err, data) {

      if (err) throw err;

      // console.log(data);


      // Getting all tasks from the selected category to create the HTML string.

      var allTasks = "";

      data.forEach(function (item) {

        allTasks += taskModal(
          item.task_id, 
          item.task_description,
          moment(item.task_deadline).format("DD, MMMM. YYYY"),
          item.task_accomplished
          );

      })

      var sentResponse = {
        tasks: allTasks,
      };

      res.send(sentResponse);

    });

  });

};