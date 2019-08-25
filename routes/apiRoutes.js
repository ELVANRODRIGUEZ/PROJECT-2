var db = require("../models").db;
var Op = require("../models").Op;
var connection = require("../models").connection;
var passport = require("../config/passport");
// var moment = require("moment");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authenticated.

    //Production console. 
    console.log("I am here at '/api/login' endpoint");
    // console.log(`Email: ${req.body.email} \nPassword: ${req.body.password}`);

    res.send("Successful");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.users
      .create({
        user_name: req.body.userName,
        phone_number: req.body.phone,
        email: req.body.email,
        password: req.body.password
      })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        //Production console.
        console.log(err);

        res.json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    //Production console.
    console.log("I am here at '/logout'.");
    req.logout();
    res.send("You are logged out");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        // email: req.user.email,
        // id: req.user.id,
        name: req.user.user_name
      });
    }
  });

  // ==========================================================================

  // Route for getting some data about our user to be used client side
  app.get("/api/all_users/find_user/:user_data", function(req, res) {
    if (!req.params.user_data) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.users
        .findOne({
          where: {
            user_name: req.params.user_data
          },
          attributes: ["id", "user_name", "email"]
        })
        .then(function(user) {
          var userData = {
            id: user.id,
            name: user.user_name,
            email: user.email
          };

          res.json(userData);
        });
    }
  });

  //! Route for getting all users data but just show part of it.
  app.get("/api/all_users", function(req, res) {
    // Test console.
    // console.log(req.user.id);

    db.users
      .findAll({
        attributes: ["id", "user_name", "email"],
        where: {
          id: {
            [Op.ne]: "16"
          }
        }
      })
      .then(function(users) {
        res.json(users);
      });
  });

  // Route for getting all projects related to a user (with the task category included).
  app.get("/api/user_projects", function(req, res) {
    var currentUser;

    db.users
      .findAll({
        attributes: [["user_name", "user"]],
        where: {
          id: req.user.id
        },
        include: [
          {
            model: db.tasks,
            attributes: [["id", "id"], ["description", "description"]],
            include: [
              {
                model: db.categories,
                attributes: [["category_name", "category"]]
              }
            ]
          }
        ]
      })
      .then(function(users) {
        console.log(users);
        res.json(users);
      });
  });

  // Route for getting all projects tasks.
  app.post("/api/user_projects***", function(req, res) {
    var currentUser;

    db.users
      .findAll({
        attributes: [["user_name", "user"]],
        where: {
          id: req.user.id
        },
        include: [
          {
            model: db.tasks,
            attributes: [["id", "id"], ["description", "description"]],
            include: [
              {
                model: db.categories,
                attributes: [["category_name", "category"]]
              }
            ]
          }
        ]
      })
      .then(function(users) {
        console.log(users);
        res.json(users);
      });
  });

  // Route for adding a project.
  app.post("/api/projects/add", function(req, res) {
    var proyName = req.body.name;
    var proyDesc = req.body.description;
    var proyUsers = JSON.parse(req.body.project_users);

    // console.log(proyUsers);
    // console.log(proyDesc);
    // console.log(proyName);

    db.projects
      .create({
        project_name: proyName,
        description: proyDesc
      })
      .then(function(project) {
        res.json(project);

        var projectRel = [];

        projectRel.push({
          project_name: project.id,
          user_name: req.user.id
        });

        proyUsers.forEach(function(item) {
          projectRel.push({
            project_name: project.id,
            user_name: item
          });
        });

        relateProject(projectRel);
      });
  });

  function relateProject(bulk) {
    db.project_users.bulkCreate(bulk).then(function() {
      console.log(
        "==>  Relationship added to projectId: %s",
        bulk[0].project_name
      );
    });
  }

  app.post("/api/category/add", function(req, res) {
    var catName = req.body.name;
    var catDescription = req.body.description;

    // console.log(CatName);
    // console.log(CatDescription);

    if (!catName || !catDescription) {
      res.send("Something went wrong. Please Try again.");
    } else {
      db.categories
        .create({
          category_name: catName,
          description: catDescription
        })
        .then(function(category) {
          var categoryRel = [];

          categoryRel.push({
            category_id: category.id,
            category_name: category.category_name
          });

          console.log(categoryRel);

          res.send(category);
        });
    }
  });

  // ===================== FOR TASK ADDITIONS.

  // Creating an object to store selected Project and Category.
  var userSelections = {
    project: null,
    category: null,
    task: null
  };
  // Creating arrays for Project selected Users (that gets populated when a Project is selected).
  var allProjectUsersId = [];
  // Creating arrays for Task selected Users (that gets populated when a Task is selected).
  //! var allTaskUsersId = [];

  // Route for storing Project and Category here in Server instead of the Client.
  app.post("/api/users-selections", function(req, res) {
    // Test console.
    console.log("I am here at '/api/users-selections' endpoint");
    // console.log(req.body.project);
    // console.log(req.body.category);

    if (req.body.project) {
      userSelections.project = req.body.project;

      if (!req.body.category) {
        userSelections.category = null;
      }
    }

    if (req.body.category) {
      userSelections.category = req.body.category;

      if (!req.body.task) {
        userSelections.task = null;
      }
    }

    if (req.body.task) {
      userSelections.task = req.body.task;
    }

    // console.log(userSelections.project);
    // console.log(userSelections.category);

    res.send("Hi");
  });

  // Route for getting all users that will be releted to the selected project.
  app.get("/api/project_users/:project", function(req, res) {
    db.project_users
      .findAll({
        attributes: [["user_name", "user_id"]],
        where: {
          project_name: req.params.project
        },
        raw: true,
        include: [
          {
            model: db.users,
            attributes: [["user_name", "user_name"], ["id", "user_id"]],
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
        // console.log(users);

        allProjectUsersId = [];

        users.forEach(function(item) {
          allProjectUsersId.push(item.user_id);
        });

        res.json(users);
      });
  });

  // Route for task adding.
  app.post("/api/:project/:category/task/add", function(req, res) {
    var taskDescription = req.body.description;
    var taskDeadline = req.body.deadline;
    var taskAccomplishment = 0;
    var taskProject = req.params.project;
    var userId = req.user.id;
    var taskCategory = req.params.category;
    var taskParent = null;

    var otherUsers = JSON.parse(req.body.other_users);

    // Test console.
    // console.log(taskDescription);
    // console.log(taskDeadline);
    // console.log(taskAccomplishment);
    // console.log(taskProject);
    // console.log(userId);
    // console.log(taskCategory);
    // console.log(taskParent);

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
          // Test console.
          // console.log(task);

          let msg = "New task created";
          let taskRel = [];

          // Test console.
          console.log(msg);
          res.send(msg);

          otherUsers.forEach(function(item) {
            taskRel.push({
              task_id: task.id,
              responsible: parseInt(item)
            });
          });

          relateTask(taskRel);
        });
    }
  });

  // Relate sent Users Array to New Task created.
  function relateTask(bulk) {
    // console.log(bulk);

    db.tasks_responsibles.bulkCreate(bulk).then(function() {
      console.log("==>  Relationships added to taskId: %s", bulk[0].task_id);
    });
  }

  // Route for getting all Task Users depending on the Project selected.
  app.get("/api/project/:task/users", function(req, res) {
    var userId = req.user.id;
    var taskId = req.params.task;
    var allTaskUsers = [];
    var allUsersForAdding = [];

    var query =
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
      console.log(data[0]);
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
        return users.user_id !== req.user.id;
      });

      res.json(forTaskAddingId);
    });
  });

  // Route for getting all users that are releted to the selected Project but filtering out the already existing ones related to the selected Task
  app.post("/api/:project/users", function(req, res) {
    // console.log("------------------------");
    // console.log(req.body.usersIds);

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
        // console.log(users);

        res.json(users);
      });
  });

  // Route to edit a Task and all its Relationships.
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

  // Route to add Responsibles to a Task.
  app.post("/api/project/task/responsible/:id", function(req, res) {
    //  Test console.
    console.log(req.body);

    var bulk = req.body;

    db.tasks_responsibles.bulkCreate(bulk).then(function(data) {
      res.send("Success!");
    });

    // Test sent message.
    // res.send("Success!");
  });

  // Route to delete Responsibles to a Task.
  app.delete("/api/project/task/responsible/delete/:id", function(req, res) {
    //  Test console.
    console.log(req.body.data);

    var bulk = req.body.data;

    db.tasks_responsibles
      .findAll({
        where: {
          task_id: req.params.id,
          responsible: bulk
        }
      })
      .then(function(data) {
        var taskUserRel = [];

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
            res.send("Users deleted");
          });
      });

    // Test sent message.
    // res.send("Success!");
  });

  // Route to delete a Task (and all relationships).
  app.delete("/api/task/:id/delete_all", function(req, res) {
    var taskId = req.params.id;

    // console.log(taskId);

    db.chat_mess_tasks
      .destroy({
        where: {
          task_id: taskId
        }
      })
      .then(function() {
        db.mail_mess_tasks.destroy({
          where: {
            task_id: taskId
          }
        });
      })
      .then(function() {
        db.tasks_responsibles.destroy({
          where: {
            task_id: taskId
          }
        });
      })
      .then(function() {
        db.tasks.destroy({
          where: {
            id: taskId
          }
        });

        res.send("Reload Page");
      });
  });

  // Route to get Task progress.
  app.get("/api/task/:id/progress", function(req, res) {
    console.log(req.body.dead_line);
    console.log(req.params.id);

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

  // Route to update Task progress.
  app.put("/api/task/:id/update", function(req, res) {
    console.log(req.body.dead_line);
    console.log(req.params.id);

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
};
