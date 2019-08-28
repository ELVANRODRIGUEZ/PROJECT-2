const db = require("../models").db;
const Op = require("../models").Op;
const connection = require("../models").connection;
const passport = require("../config/passport");

module.exports = function(app) {

  //*++++++++++++++++++++++++++++++++++++++++++++++++ GET

  // Route for logging user out
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.get("/logout", function(req, res) {
    //Production console.
    console.log("I am here at '/logout'.");
    req.logout();
    res.send("You are logged out");
  });

  // Route to get all selected Project Users.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
        // console.log("++++++++++++++++++++++++++++++++");
        // console.log(users);
        // console.log("++++++++++++++++++++++++++++++++");

        res.json(users);
      });
  });

  // Route to get the Users related to a Task with the logged User filtered out.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.get("/api/:user/project/:task/users", function(req, res) {
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
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.get("/api/task/:id/progress", function(req, res) {
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


  //*++++++++++++++++++++++++++++++++++++++++++++++++ POST

  // Using the passport.authenticate middleware with our local strategy. If the user has valid login credentials, send them to the members page. Otherwise the user will be sent an error
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request. So we're sending the user back the route to the members page because the redirect will happen on the front end. They won't get this or even be able to access this page if they aren't authenticated.

    //Production console.
    console.log("I am here at '/api/login' endpoint");
    // console.log(`Email: ${req.body.email} \nPassword: ${req.body.password}`);

    if (req.user) {
      res.send("Successful");
    } else {
      res.send("There has been an error");
    }
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in, otherwise send back an error.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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

  // Route for adding a project.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.post("/api/:user/projects/add", function(req, res) {
    let userId = req.params.user;
    let proyName = req.body.name;
    let proyDesc = req.body.description;
    let proyUsers = JSON.parse(req.body.project_users);

    //Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(userId);
    // console.log(proyUsers);
    // console.log(proyDesc);
    // console.log(proyName);
    // console.log("++++++++++++++++++++++++++++++++");

    db.projects
      .create({
        project_name: proyName,
        description: proyDesc
      })
      .then(function(project) {
        res.json(project);

        let projectRel = [];

        projectRel.push({
          project_name: project.id,
          user_name: userId
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

  // This function establishes the selected Users to the newly created Project.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  function relateProject(bulk) {
    db.project_users.bulkCreate(bulk).then(function() {
      //Test console.
      // console.log("++++++++++++++++++++++++++++++++");
      // console.log(
      //   "==>  Relationship added to projectId: %s",
      //   bulk[0].project_name
      // );
      // console.log("++++++++++++++++++++++++++++++++");
    });
  }

  // Route for adding a category.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.post("/api/category/add", function(req, res) {
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

  // Route for task adding.
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.post("/api/:user/:project/:category/task/add", function(req, res) {
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
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  function relateTask(bulk) {
    db.tasks_responsibles.bulkCreate(bulk).then(function() {
      //Test console.
      // console.log("++++++++++++++++++++++++++++++++");
      // console.log("Relationships added to taskId: %s", bulk[0].task_id);
      // console.log("++++++++++++++++++++++++++++++++");
    });
  }

  // Route for getting all users that are related to the selected Project but filtering out the already existing ones related to the selected Task
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.post("/api/:project/users", function(req, res) {
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
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.post("/api/project/task/responsible/:id", function(req, res) {
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


  //*++++++++++++++++++++++++++++++++++++++++++++++++ PUT

  // Route to update the Task..
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
  //! >>>>>>>>>>>>>>>>>>>>>>>READY!!!<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
