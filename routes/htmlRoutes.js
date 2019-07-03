// =================================== Require db connection and models

var db = require("../models").db;
var Op = require("../models").Op;
var connection = require("../models").connection;
var moment = require("moment");


// =================================== Require hardcoded templates.

var taskModal = require("../hardcoded-templates/taskModal-templete");
var userProfile = require("../hardcoded-templates/project-templete.js");
var categoryCard = require("../hardcoded-templates/category-templete.js");
var userList = require("../hardcoded-templates/usersList-templete");


// =================================== Requiring our custom middleware for checking if a user is logged in.

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  var allTasksInProject = [];
  var allTasksInCategory = [];

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

    // Test console.
    // console.log(req.user);

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
      
      // Test console.
      // console.log(data);

      if (data.length == 0) {

        var sentResponse = {
          projectsHtml: "You have no Projects yet.",
          userTagHtml: 
          userProfile.userNameTag(req.user.user_name),
          user_id: req.user.id,
          user_name: req.user.user_name
        }

        res.send(sentResponse);

      } else {


        // Getting the User Name of the query and formatting as html.

        var userName = userProfile.userNameTag(data[0].user);

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
      }

    });

    // }

  });

  app.get("/members/info/:projectId", isAuthenticated, function (req, res) {
    // function test(cb) {

    var userId = req.user.id;
    var projectId = req.params.projectId;

    // Query to get all the Task count within each Category for the selected Project.
    var query =
      'SELECT ' +
      'c.category_name as "category_name", ' +
      'c.description as "category_description", ' +
      'c.id as "category_id", ' +
      't2.tasks_count ' +
      'FROM categories c ' +
      'LEFT JOIN ' +
      '(SELECT ' +
      'c.category_name as "category_name", ' +
      'c.id as "category_id", ' +
      't.task_project as "project_id", ' +
      't.id as "task_id", ' +
      'tr.responsible as "responsible_id", ' +
      'COUNT(t.id) as "tasks_count" ' +
      'FROM categories c ' +
      'LEFT JOIN tasks t ' +
      'ON c.id = t.task_category ' +
      'LEFT JOIN tasks_responsibles tr ' +
      'ON tr.task_id = t.id ' +
      'WHERE tr.responsible = ' + userId +
      ' AND t.task_project = ' + projectId +
      ' GROUP BY category_id) t2 ' +
      'ON t2.category_id = c.id ' +
      'ORDER BY category_id';

    connection.query(query, function (err, data) {

      if (err) throw err;

      // Test console.
      // console.log(data);

      var allCategories = "";

      data.forEach(function (item) {

        allCategories += categoryCard(
          item.category_id,
          item.category_name,
          item.category_description,
          item.tasks_count || 0
        );

      })

      var sentResponse = {
        categories: allCategories
      };

      res.json(sentResponse);

      // Query to get all Tasks within the selected Project.
      var query2 =
        'SELECT ' +
        'u.user_name as "user", ' +
        'u.id as "user_id", ' +
        't.description as "task_description", ' +
        'tr.task_id as "task_id", ' +
        'p.project_name as "project_name", ' +
        't.task_project as "project_id" ' +
        'FROM users u ' +
        'LEFT JOIN tasks_responsibles tr ' +
        'ON tr.responsible = u.id ' +
        'LEFT JOIN tasks t ON t.id = tr.task_id ' +
        'LEFT JOIN projects p ON p.id = t.task_project ' +
        'WHERE u.id = ' + userId + ' ' +
        'AND p.id = ' + projectId;

      connection.query(query2, function (err3, projTasks) {

        if (err3) throw err3;

        // Test console.
        // console.log(projTasks);

        allTasksInProject = [];

        projTasks.forEach(function (item) {

          allTasksInProject.push(item.task_id);

        })

        // Test console.
        // console.log(allProjectTasks);

      });

    })
    

  });

  app.get("/members/info/:projectId/category/:categoryId", isAuthenticated, function (req, res) {
    // function test(cb) {

    var userId = req.user.id;
    var categoryId = req.params.categoryId;
    var projectId = req.params.projectId;

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
      'WHERE u.id = ' + userId +
      ' AND p.id = ' + projectId + ') up ' +
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
      'WHERE category_id = ' + categoryId;

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
        tasks: allTasks
      };

      res.send(sentResponse);

    });

  });

  app.get("/members/info/:projectId/category/:categoryId/all_tasks", isAuthenticated, function (req, res) {

    var userId = req.user.id;
    var categoryId = req.params.categoryId;
    var projectId = req.params.projectId;

    // Test console.
    // console.log(userId);
    // console.log(projectId);
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
      'WHERE u.id = ' + userId +
      ' AND p.id = ' + projectId + ') up ' +
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
      'WHERE category_id = ' + categoryId;

    connection.query(query, function (err, data) {

      if (err) throw err;

      // Test console.
      // console.log(data);


      // Getting all Tasks id's from the selected Category to feed the "allTasksInCategory" array.

      allTasksInCategory = [];

      data.forEach(function (item) {

        allTasksInCategory.push(item.task_id)

      })

      //Test console.
      // console.log(allTasksInCategory);

      res.json(allTasksInCategory);

    });

  });

  // Route to delete a Tasks (and all relationships) nested in a Category.
  app.delete("/members/info/category/delete_all_tasks", function (req, res) {

    console.log(allTasksInCategory);

    db.chat_mess_tasks.destroy({
      where: {
        task_id: allTasksInCategory
      }
    }).
    then(function () {

      db.mail_mess_tasks.destroy({
        where: {
          task_id: allTasksInCategory
        }
      });

    }).
    then(function () {

      db.tasks_responsibles.destroy({
        where: {
          task_id: allTasksInCategory
        }
      });

    }).
    then(function () {

      db.tasks.destroy({
        where: {
          id: allTasksInCategory
        }
      });

      res.send("Reload Page");

    });

  });

  // Route to delete a Tasks (and all relationships) nested in a Category.
  app.delete("/members/info/project/delete_all_tasks", function (req, res) {

    // Test console.
    console.log(allTasksInProject);

    db.chat_mess_tasks.destroy({
      where: {
        task_id: allTasksInProject
      }
    }).
    then(function () {

      db.mail_mess_tasks.destroy({
        where: {
          task_id: allTasksInProject
        }
      });

    }).
    then(function () {

      db.tasks_responsibles.destroy({
        where: {
          task_id: allTasksInProject
        }
      });

    }).
    then(function () {

      db.tasks.destroy({
        where: {
          id: allTasksInProject
        }
      });

      res.send("Reload Page");

    });

  });

}