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

    res.send("/members");

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
        // email: req.user.email,
        // id: req.user.id,
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
  app.get("/api/user_projects", function (req, res) {

    var currentUser;

    db.users.findAll({
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
      console.log(users);
      res.json(users);

    });

  });

  // Route for getting all projects tasks.
  app.post("/api/user_projects***", function (req, res) {

    var currentUser;

    db.users.findAll({
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
      
      console.log(users);
      res.json(users);

    });

  });


  // Route for adding a project.
  app.post("/api/projects/add", function (req, res) {

    var proyName = req.body.project_name;
    var proyDesc = req.body.description;
    var otherUsers = JSON.parse(req.body.other_users);

    // console.log(otherUsers);
    // console.log(proyDesc);
    // console.log(proyName);

    db.projects.create({
      project_name: proyName,
      description: proyDesc
    }).then(function (project) {

      res.json(project);

      var projectRel = [];

      projectRel.push({
        project_name: project.id,
        user_name: req.user.id
      });

      otherUsers.forEach(function (item) {

        projectRel.push({
          project_name: project.id,
          user_name: item
        });

      })

      relateProject(projectRel)

    });

  })

  function relateProject(bulk) {

    db.project_users.bulkCreate(bulk).then(function () {

      console.log(
        "==>  Relationship added to projectId: %s",
        bulk[0].project_name
      );

    });

  }

  app.post("/api/category/add", function (req, res) {

    var catName = req.body.category_name;
    var catDescription = req.body.description;

    // console.log(CatName);
    // console.log(CatDescription);

    if (!catName || !catDescription) {
      res.send("Something went wrong. Please Try again.");
    } else {
      db.categories.create({
        category_name: catName,
        description: catDescription
      }).then(function (category) {

        res.send("New Category successfully added.");

      });
    }
  });

  // ===================== FOR TASK ADDITIONS.

  // Creating an object to store selected Project and Category.
  var userSelections = {
    project: null,
    category: null
  }

  // Route for storing Project and Category here in Server instead of the Client.
  app.post("/api/users-selections", function (req, res) {

    if (req.body.project) {

      userSelections.project = req.body.project;

      if (!req.body.category) {

        userSelections.category = null;

      }

    }

    if (req.body.category) {

      userSelections.category = req.body.category;

    }

    // console.log(userSelections.project);
    // console.log(userSelections.category);

    res.send("Hi");

  })

  // Route for getting all users that will be releted to the selected project.
  app.get("/api/project_users", function (req, res) {

    db.project_users.findAll({
      attributes: [
        ["user_name", "user_id"]
      ],
      where: {
        project_name: userSelections.project
      },
      include: [{
        model: db.users,
        attributes: [
          ["user_name","user_name"]
        ],
        include: [{
          model: db.project_users,
          attributes: [
            ["project_name","project_name"],
            ["id","project_id"]
          ],
          where: {
            project_name: userSelections.project
          }
        }]
      }]
    }).then(function (users) {

      res.json(users);

    });

  });

  // Route for task adding.
  app.post("/api/task/add", function (req, res) {

    var taskDescription = req.body.description;
    var taskDeadline = req.body.deadline;
    var taskAccomplishment = 0;
    var taskProject = userSelections.project;
    var userId = req.user.id;
    var taskCategory = userSelections.category;
    var taskParent = null;

    var otherUsers = JSON.parse(req.body.other_users);

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
      db.tasks.create({
        description: taskDescription,
        dead_line: taskDeadline,
        accomplished: taskAccomplishment,
        task_project: taskProject,
        created_by: userId,
        task_category: taskCategory,
        parent_id: taskParent
      }).then(function (task) {

        // console.log(task.id);
        console.log("success!");
        res.send("New Task successfully added.");

        var taskRel = [];

        taskRel.push({
          task_id: task.id,
          responsible: req.user.id
        });

        otherUsers.forEach(function (item) {

          taskRel.push({
            task_id: task.id,
            responsible: parseInt(item)
          });
  
        })

        relateTask(taskRel);

      });

    }

  });

  function relateTask(bulk) {

    // console.log(bulk);

    db.tasks_responsibles.bulkCreate(bulk).then(function () {

      console.log(
        "==>  Relationships added to taskId: %s",
        bulk[0].task_id
      );

    });

  }
  
};