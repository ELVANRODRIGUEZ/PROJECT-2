const db = require("../models").db;
const Op = require("../models").Op;
const connection = require("../models").connection;

// =================================== Requiring our custom middleware for checking if a user is logged in.

let isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  //*++++++++++++++++++++++++++++++++++++++++++++++++ POST

  // Route for adding a category.
  app.post("/api/category/add", isAuthenticated, function(req, res) {
    let catName = req.body.name;
    let catDescription = req.body.description;

    //Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(CatName);
    // console.log(CatDescription);
    // console.log("++++++++++++++++++++++++++++++++");

    if (!catName || !catDescription) {
      res.send("Something went wrong. Please Try again.");
    } else {
      db.categories
        .create({
          category_name: catName,
          description: catDescription
        })
        .then(function(category) {
          let categoryRel = [];

          categoryRel.push({
            category_id: category.id,
            category_name: category.category_name
          });

          //Test console.
          // console.log("++++++++++++++++++++++++++++++++");
          // console.log(categoryRel);
          // console.log("++++++++++++++++++++++++++++++++");

          res.send(category);
        });
    }
  });

  //*++++++++++++++++++++++++++++++++++++++++++++++++ GET

  // This is to get the amount of Tasks in each Category according to the Project selected.
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

  //*++++++++++++++++++++++++++++++++++++++++++++++++ DELETE

  // Route to delete a Tasks (and all relationships) nested in a Category.
  app.delete("/members/:user/info/:project/category/:category/delete_all_tasks", isAuthenticated, function(
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
};
