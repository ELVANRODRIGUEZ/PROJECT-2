const db = require("../models").db;
const Op = require("../models").Op;
const connection = require("../models").connection;

// =================================== Requiring our custom middleware for checking if a user is logged in.

let isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  //*++++++++++++++++++++++++++++++++++++++++++++++++ POST

  // Route for task adding.
  app.post("/api/:user/:project/:category/task/add", isAuthenticated, function(req, res) {
    let taskDescription = req.body.description;
    let taskDeadline = req.body.deadline;
    let taskAccomplishment = 0;
    let taskProject = req.params.project;
    let userId = req.params.user;
    let taskCategory = req.params.category;
    let taskParent = null;

    let otherUsers = JSON.parse(req.body.other_users);

    // Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(taskDescription);
    // console.log(taskDeadline);
    // console.log(taskAccomplishment);
    // console.log(taskProject);
    // console.log(userId);
    // console.log(taskCategory);
    // console.log(taskParent);
    // console.log("++++++++++++++++++++++++++++++++");

    if (
      !taskDescription ||
      !taskDeadline ||
      !taskProject ||
      !userId ||
      !taskCategory
    ) {
      res.send("Something went wrong. Please Try again.");
      console.log("Failed on adding new Task!");
    } else {
      db.tasks
        .create({
          description: taskDescription,
          dead_line: taskDeadline,
          accomplished: taskAccomplishment,
          task_project: taskProject,
          created_by: userId,
          task_category: taskCategory,
          parent_id: taskParent
        })
        .then(function(task) {
          let msg = "New task created";
          let taskRel = [];

          res.send(msg);

          otherUsers.forEach(function(item) {
            taskRel.push({
              task_id: task.id,
              responsible: parseInt(item)
            });
          });

          // Test console.
          // console.log("++++++++++++++++++++++++++++++++");
          // console.log(task);
          // console.log(msg);
          // console.log(taskRel);
          // console.log("++++++++++++++++++++++++++++++++");

          relateTask(taskRel);
        });
    }
  });

  // Route to relate sent Users Array to New Task created.
  function relateTask(bulk) {
    db.tasks_responsibles.bulkCreate(bulk).then(function() {
      //Test console.
      // console.log("++++++++++++++++++++++++++++++++");
      // console.log("Relationships added to taskId: %s", bulk[0].task_id);
      // console.log("++++++++++++++++++++++++++++++++");
    });
  }

  // Route for getting all users that are related to the selected Project but filtering out the already existing ones related to the selected Task
  //>>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.post("/api/:project/users", isAuthenticated, function(req, res) {
    //Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(req.body.usersIds);
    // console.log("++++++++++++++++++++++++++++++++");

    db.project_users
      .findAll({
        attributes: [["user_name", "user_id"]],
        where: {
          project_name: req.params.project,
          user_name: { [Op.notIn]: req.body.usersIds }
        },
        raw: true,
        include: [
          {
            model: db.users,
            attributes: [
              ["user_name", "user_name"],
              ["id", "user_id"],
              ["email", "user_mail"]
            ],
            include: [
              {
                model: db.project_users,
                attributes: [
                  ["project_name", "project_id"],
                  ["id", "relationship_project-user"]
                ],
                where: {
                  project_name: req.params.project
                },
                include: [
                  {
                    model: db.projects,
                    attributes: [["project_name", "project_name"]]
                  }
                ]
              }
            ]
          }
        ]
      })
      .then(function(users) {
        // Test console.
        // console.log("++++++++++++++++++++++++++++++++");
        // console.log(users);
        // console.log("++++++++++++++++++++++++++++++++");

        res.json(users);
      });
  });

  // Route to add Responsibles to a Task.
  app.post("/api/project/task/responsible/:id", isAuthenticated, function(req, res) {
    //  Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(req.body);
    // console.log("++++++++++++++++++++++++++++++++");

    let bulk = req.body;

    db.tasks_responsibles.bulkCreate(bulk).then(function(data) {
      //  Test console.
      // console.log("++++++++++++++++++++++++++++++++");
      // console.log("Success!");
      // console.log("++++++++++++++++++++++++++++++++");

      res.send("Success!");
    });
  });

  //*++++++++++++++++++++++++++++++++++++++++++++++++ GET

  // Route to get the Users related to a Task with the logged User filtered out.
  app.get("/api/:user/project/:task/users", isAuthenticated, function(req, res) {
    let userId = req.params.user;
    let taskId = req.params.task;
    let allTaskUsers = [];
    let forTaskAddingId = [];

    // Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(userId);
    // console.log(taskId);
    // console.log("++++++++++++++++++++++++++++++++");

    let query =
      "SELECT " +
      't.id as "task_id", ' +
      't.description as "task_description", ' +
      'u.user_name as "user_name", ' +
      'u.email as "user_mail", ' +
      'tr.responsible as "user_id" ' +
      "FROM tasks_responsibles tr " +
      "LEFT JOIN tasks t " +
      "ON t.id = tr.task_id " +
      "LEFT JOIN users u " +
      "ON tr.responsible = u.id " +
      "WHERE task_id = " +
      taskId;

    connection.query(query, function(err, data) {
      if (err) throw err;

      // Test console.
      // console.log(data[0]);
      // console.log(data[0].task_id);
      // console.log(allTaskUsers);
      // console.log(allProjectUsers);

      // Create an array containing all Users for the selected Task (including the Session User).
      allTaskUsers = data.map(user => {
        return {
          user_id: user.user_id,
          user_name: user.user_name,
          user_mail: user.user_mail
        };
      });

      // Filter Session User to send a clean "ready to use" Users to Add array.
      forTaskAddingId = allTaskUsers.filter(users => {
        return users.user_id !== parseInt(userId);
      });

      res.json(forTaskAddingId);
    });
  });

  // Route to get Task progress.
  app.get("/api/task/:id/progress", isAuthenticated, function(req, res) {
    //Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(req.body.dead_line);
    // console.log(req.params.id);
    // console.log("++++++++++++++++++++++++++++++++");

    db.tasks
      .findOne({
        where: {
          id: req.params.id
        },
        attributes: ["accomplished"]
      })
      .then(function(data) {
        res.json(data);
      });
  });

  // This request is to retrieve the Tasks related to the selected Project and Category.
  app.get("/members/:user/info/:projectId/category/:categoryId", isAuthenticated, function(
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

  //*++++++++++++++++++++++++++++++++++++++++++++++++ PUT

  // Route to update the Task..
  app.put("/api/project/task/:id", function(req, res) {
    db.tasks
      .update(
        {
          description: req.body.description,
          dead_line: req.body.deadline
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(data) {
        res.json(data);
      });
  });

  // Route to update Task progress.
  app.put("/api/task/:id/update", function(req, res) {
    //Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(req.body.dead_line);
    // console.log(req.params.id);
    // console.log("++++++++++++++++++++++++++++++++");

    db.tasks
      .update(
        {
          accomplished: req.body.accomplished
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(data) {
        res.json(data);
      });
  });

  //*++++++++++++++++++++++++++++++++++++++++++++++++ DELETE

  // Route to delete Users from the Task.
  app.delete("/api/project/task/responsible/delete/:id", function(req, res) {
    let bulk = req.body.data;

    //  Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(bulk);
    // console.log(req.params.id);
    // console.log("++++++++++++++++++++++++++++++++");

    db.tasks_responsibles
      .findAll({
        where: {
          task_id: req.params.id,
          responsible: bulk
        }
      })
      .then(function(data) {
        let taskUserRel = [];

        data.forEach(function(item) {
          taskUserRel.push(item.id);
        });

        db.tasks_responsibles
          .destroy({
            where: {
              id: taskUserRel
            }
          })
          .then(function(data2) {
            //  Test console.
            // console.log("++++++++++++++++++++++++++++++++");
            // console.log("Users deleted");
            // console.log("++++++++++++++++++++++++++++++++");

            res.send("Users deleted");
          });
      });
  });

  // Route to delete a User from a Task (not the Task itself).
  app.delete("/api/:user/task/:id/delete", function(req, res) {
    let taskId = req.params.id;
    let userId = req.params.user;

    //Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(taskId);
    // console.log(userId);
    // console.log("++++++++++++++++++++++++++++++++");

    db.tasks_responsibles
      .destroy({
        where: {
          task_id: taskId,
          responsible: userId
        }
      })
      .then(function() {
        res.send("Reload Page");
      });
  });
};
