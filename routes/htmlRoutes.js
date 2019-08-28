// =================================== Require db connection and models

const db = require("../models").db;
const Op = require("../models").Op;
const connection = require("../models").connection;
const moment = require("moment");
const path = require("path");

// =================================== Requiring our custom middleware for checking if a user is logged in.

let isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {


  //*++++++++++++++++++++++++++++++++++++++++++++++++ GET
  

  // Get all members so they can be added to a new Project.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.get("/members/allMembers", isAuthenticated, function(req, res) {
    // Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(req.user);
    // console.log("++++++++++++++++++++++++++++++++");

    let id = req.user.id;

    let query =
      "SELECT " +
      'up.id as "user_id", ' +
      'up.user_name as "user_name", ' +
      'up.email as "user_email" ' +
      "FROM users up " +
      "WHERE up.id != " +
      id +
      " ORDER BY user_id;";

    connection.query(query, function(err, data) {
      // Test console.
      // console.log("++++++++++++++++++++++++++++++++");
      // console.log(data);
      // console.log("++++++++++++++++++++++++++++++++");

      res.send(data);
    });
  });

  // Get all info about the logged member.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.get("/members/info", isAuthenticated, function(req, res) {
    let id = req.user.id;

    // Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(id);
    // console.log("++++++++++++++++++++++++++++++++");

    let query =
      "SELECT " +
      'up.user as "user", ' +
      'up.user_id as "user_id", ' +
      'up.user_email as "user_email", ' +
      'up.project as "projects", ' +
      'up.project_description as "project_description", ' +
      'up.project_id as "projects_id", ' +
      'tc.category as "category", ' +
      'tc.category_id as "category_id", ' +
      'upt.task_description as "tasks", ' +
      'upt.task_id as "tasks_id" ' +
      "FROM " +
      '(SELECT u.user_name as "user", ' +
      'u.id as "user_id", ' +
      'u.email as "user_email", ' +
      'p.project_name as "project", ' +
      'p.description as "project_description", ' +
      'p.id as "project_id" ' +
      "FROM users u " +
      "LEFT JOIN project_users pu " +
      "ON u.id = pu.user_name JOIN projects p ON p.id = pu.project_name WHERE u.id = " +
      id +
      ") up " +
      "LEFT JOIN " +
      '(SELECT u.id as "user", ' +
      'tr.task_id as "task_id", ' +
      't.task_project as "task_project_id", ' +
      't.description as "task_description" ' +
      "FROM users u LEFT JOIN tasks_responsibles tr ON tr.responsible = u.id LEFT JOIN tasks t " +
      "ON t.id = tr.task_id WHERE u.id = " +
      id +
      ") upt " +
      "ON upt.task_project_id = up.project_id " +
      "LEFT JOIN " +
      '(SELECT c.id as "category_id", ' +
      'c.description as "category", ' +
      't.id as "task_id", ' +
      't.description as "task" ' +
      "FROM categories c LEFT JOIN tasks t " +
      "ON t.task_category = c.id) tc " +
      "ON upt.task_id = tc.task_id";

    connection.query(query, function(err, data) {
      if (err) throw err;

      // Test console.
      // console.log("++++++++++++++++++++++++++++++++");
      // console.log(data);
      // console.log(req.user);
      // console.log("++++++++++++++++++++++++++++++++");

      if (data.length == 0) {
        let sentResponse = {
          projectsHtml: "You have no Projects yet.",
          user_Id: req.user.id,
          user_Name: req.user.user_name,
          user_Email: req.user.email
        };

        res.send(sentResponse);
      } else {
        let allProjects = [];

        // Getting all the proyects from the query and formatting as html.
        // We need evaluation to not add an already added project while creating the html string.

        let project = "first";

        data.forEach(function(item) {
          if (project !== item.projects_id) {
            project = item.projects_id;

            allProjects.push({
              projId: item.projects_id,
              projName: item.projects,
              projDescription: item.project_description
            });
          }
        });

        // Creating a JSON object to send as response.
        let sentResponse = {
          projects: allProjects,
          user_Name: data[0].user,
          user_Id: data[0].user_id,
          user_Email: data[0].user_email
        };

        // Sendig response.
        res.send(sentResponse);
      }
    });
  });

  // This is to get the amount of Tasks in each Category according to the Project selected.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.get("/members/:user/info/:projectId", isAuthenticated, function(
    req,
    res
  ) {
    let userId = req.params.user;
    let projectId = req.params.projectId;
    let allCategories = [];

    // Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(userId);
    // console.log(projectId);
    // console.log("++++++++++++++++++++++++++++++++");

    // Query to get all the Task count within each Category for the selected Project.
    let query =
      "SELECT " +
      'c.category_name as "category_name", ' +
      'c.description as "category_description", ' +
      'c.id as "category_id", ' +
      "t2.tasks_count " +
      "FROM categories c " +
      "LEFT JOIN " +
      "(SELECT " +
      'c.category_name as "category_name", ' +
      'c.id as "category_id", ' +
      't.task_project as "project_id", ' +
      't.id as "task_id", ' +
      'tr.responsible as "responsible_id", ' +
      'COUNT(t.id) as "tasks_count" ' +
      "FROM categories c " +
      "LEFT JOIN tasks t " +
      "ON c.id = t.task_category " +
      "LEFT JOIN tasks_responsibles tr " +
      "ON tr.task_id = t.id " +
      "WHERE tr.responsible = " +
      userId +
      " AND t.task_project = " +
      projectId +
      " GROUP BY category_id) t2 " +
      "ON t2.category_id = c.id " +
      "ORDER BY category_id";

    connection.query(query, function(err, data) {
      if (err) throw err;

      // Test console.
      // console.log("++++++++++++++++++++++++++++++++");
      // console.log(data);
      // console.log("++++++++++++++++++++++++++++++++");

      data.forEach(function(item) {
        allCategories.push({
          catId: item.category_id,
          catName: item.category_name,
          catDescription: item.category_description,
          taskCount: item.tasks_count || 0
        });
      });

      let sentResponse = {
        categories: allCategories
      };

      res.json(sentResponse);
    });
  });

  // This request is to retrieve the Tasks related to the selected Project and Category.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.get("/members/:user/info/:projectId/category/:categoryId", function(
    req,
    res
  ) {
    //Production console.
    console.log(
      "I am here at '/members/:user/info/:projectId/category/:categoryId' endpoint"
    );

    let userId = req.params.user;
    let categoryId = req.params.categoryId;
    let projectId = req.params.projectId;
    let allTasks = [];

    //Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(userId);
    // console.log(projectId);
    // console.log(categoryId);
    // console.log("++++++++++++++++++++++++++++++++");

    let query =
      "SELECT " +
      "up.user, " +
      "up.user_id, " +
      "up.project, " +
      "up.project_id, " +
      "tc.category, " +
      "tc.category_id, " +
      "upt.task_description, " +
      "upt.task_deadline, " +
      "upt.task_accomplished, " +
      "upt.task_id " +
      "FROM " +
      "(SELECT " +
      'u.user_name as "user", ' +
      'u.id as "user_id", ' +
      'p.project_name as "project", ' +
      'p.id as "project_id" ' +
      "FROM users u " +
      "LEFT JOIN project_users pu ON u.id = pu.user_name " +
      "JOIN projects p ON p.id = pu.project_name " +
      "WHERE u.id = " +
      userId +
      " AND p.id = " +
      projectId +
      ") up " +
      "LEFT JOIN " +
      "(SELECT " +
      'u.id as "user", ' +
      'tr.task_id as "task_id", ' +
      't.task_project as "task_project_id", ' +
      't.description as "task_description", ' +
      't.dead_line as "task_deadline", ' +
      't.accomplished as "task_accomplished" ' +
      "FROM users u " +
      "LEFT JOIN tasks_responsibles tr ON tr.responsible = u.id " +
      "LEFT JOIN tasks t ON t.id = tr.task_id " +
      "WHERE u.id = " +
      userId +
      ") upt " +
      "ON upt.task_project_id = up.project_id " +
      "LEFT JOIN " +
      "(SELECT " +
      'c.id as "category_id", ' +
      'c.description as "category", ' +
      't.id as "task_id", ' +
      't.description as "task" ' +
      "FROM categories c " +
      "LEFT JOIN tasks t ON t.task_category = c.id) tc " +
      "ON upt.task_id = tc.task_id " +
      "WHERE category_id = " +
      categoryId;

    connection.query(query, function(err, data) {
      if (err) throw err;

      //Test console.
      // console.log("++++++++++++++++++++++++++++++++");
      // console.log(data);
      // console.log("++++++++++++++++++++++++++++++++");

      // Getting all tasks from the selected category to create the HTML string.

      data.forEach(function(item) {
        allTasks.push(item);
      });

      let sentResponse = {
        tasks: allTasks
      };

      res.send(sentResponse);
    });
  });

  // This is to get all the Task's Ids from the Selected Project and Category.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.get(
    "/members/:user/info/:projectId/category/:categoryId/all_tasks",
    isAuthenticated,
    function(req, res) {
      //Production console.
      console.log(
        "I am here at '/members/:user/info/:projectId/category/:categoryId/all_tasks' endpoint"
      );

      let userId = req.params.user;
      let categoryId = req.params.categoryId;
      let projectId = req.params.projectId;
      let allTasksInCategory = [];

      // Test console.
      // console.log("++++++++++++++++++++++++++++++++");
      // console.log(userId);
      // console.log(projectId);
      // console.log(categoryId);
      // console.log("++++++++++++++++++++++++++++++++");

      let query =
        "SELECT " +
        "up.user, " +
        "up.user_id, " +
        "up.project, " +
        "up.project_id, " +
        "tc.category, " +
        "tc.category_id, " +
        "upt.task_description, " +
        "upt.task_deadline, " +
        "upt.task_accomplished, " +
        "upt.task_id " +
        "FROM " +
        "(SELECT " +
        'u.user_name as "user", ' +
        'u.id as "user_id", ' +
        'p.project_name as "project", ' +
        'p.id as "project_id" ' +
        "FROM users u " +
        "LEFT JOIN project_users pu ON u.id = pu.user_name " +
        "JOIN projects p ON p.id = pu.project_name " +
        "WHERE u.id = " +
        userId +
        " AND p.id = " +
        projectId +
        ") up " +
        "LEFT JOIN " +
        "(SELECT " +
        'u.id as "user", ' +
        'tr.task_id as "task_id", ' +
        't.task_project as "task_project_id", ' +
        't.description as "task_description", ' +
        't.dead_line as "task_deadline", ' +
        't.accomplished as "task_accomplished" ' +
        "FROM users u " +
        "LEFT JOIN tasks_responsibles tr ON tr.responsible = u.id " +
        "LEFT JOIN tasks t ON t.id = tr.task_id " +
        "WHERE u.id = " +
        userId +
        ") upt " +
        "ON upt.task_project_id = up.project_id " +
        "LEFT JOIN " +
        "(SELECT " +
        'c.id as "category_id", ' +
        'c.description as "category", ' +
        't.id as "task_id", ' +
        't.description as "task" ' +
        "FROM categories c " +
        "LEFT JOIN tasks t ON t.task_category = c.id) tc " +
        "ON upt.task_id = tc.task_id " +
        "WHERE category_id = " +
        categoryId;

      connection.query(query, function(err, data) {
        if (err) throw err;

        // Test console.
        // console.log("++++++++++++++++++++++++++++++++");
        // console.log(data);
        // console.log("++++++++++++++++++++++++++++++++");

        // Getting all Tasks id's from the selected Category to feed the "allTasksInCategory" array.

        data.forEach(function(item) {
          allTasksInCategory.push(item.task_id);
        });

        //Test console.
        // console.log("++++++++++++++++++++++++++++++++");
        // console.log(allTasksInCategory);
        // console.log("++++++++++++++++++++++++++++++++");

        res.json(allTasksInCategory);
      });
    }
  );


  //*++++++++++++++++++++++++++++++++++++++++++++++++ DELETE

  // Route to delete a Tasks (and all relationships) nested in a Category.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.delete("/members/:user/info/:project/category/:category/delete_all_tasks", function(
    req,
    res
  ) {
    let userId = req.params.user;

    db.tasks
      .findAll({
        where: {
          task_project: req.params.project,
          task_category: req.params.category
        }
      })
      .then(function(data) {
        let allProjCatTasks = data.map(task => {
          return task.dataValues.id;
        });

        //  Test console.
        // console.log("++++++++++++++++++++++++++++++++");
        // console.log(userId);
        // console.log(allProjCatTasks);
        // console.log("++++++++++++++++++++++++++++++++");

        db.tasks_responsibles
          .destroy({
            where: {
              task_id: {
                [Op.in]: allProjCatTasks
              },
              responsible: userId
            }
          })
          .then(function() {
            res.send("all User's Project's Category Tasks Deleted");
          });
      });
  });

  // Route to delete a Tasks (and all relationships) nested in a Project.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.delete("/members/:user/info/:project/delete_all_tasks", function(
    req,
    res
  ) {
    let userId = req.params.user;

    //  Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(userId);
    // console.log("++++++++++++++++++++++++++++++++");

    db.tasks
      .findAll({
        where: {
          task_project: req.params.project
        }
      })
      .then(function(data) {
        let allprojectTasks = data.map(task => {
          return task.dataValues.id;
        });
        //  Test console.
        // console.log("++++++++++++++++++++++++++++++++");
        // console.log(allprojectTasks);
        // console.log("++++++++++++++++++++++++++++++++");

        db.tasks_responsibles
          .destroy({
            where: {
              task_id: {
                [Op.in]: allprojectTasks
              },
              responsible: userId
            }
          })
          .then(function(data2) {
            res.send("all User's Project Tasks Deleted");
          });
      });
  });
};
