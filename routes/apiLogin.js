const db = require("../models").db;
const Op = require("../models").Op;
const connection = require("../models").connection;
const passport = require("../config/passport");

// =================================== Requiring our custom middleware for checking if a user is logged in.

let isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  //*++++++++++++++++++++++++++++++++++++++++++++++++ POST

  // Using the passport.authenticate middleware with our local strategy. If the user has valid login credentials, send them to the members page. Otherwise the user will be sent an error
  //? Route for logging on a user.
  //> Request from: "../client/src/pages/Login.js"
  app.post("/api/post/login", passport.authenticate("local"), function(
    req,
    res
  ) {
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
  //? Route for signing up a user.
  //> Request from: "../client/src/pages/Signup.js"
  app.post("/api/post/signup", function(req, res) {
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

  //*++++++++++++++++++++++++++++++++++++++++++++++++ GET

  //? Route for logging user out.
  //> Request from: "../client/src/components/Navbar/index.js"
  app.get("/api/get/logout", function(req, res) {
    //Production console.
    console.log("I am here at '/logout'.");
    req.logout();
    res.send("You are logged out");
  });

  //? Get all info about the logged member.
  //> Request from: "../client/src/pages/Members.js"
  app.get("/api/get/user/info", isAuthenticated, function(req, res) {
    let {id} = req.user;
    let {user_name} = req.user;
    let {email} = req.user;

    // Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(id);
    // console.log(user_name);
    // console.log(email);
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
          user_Id: id,
          user_Name: user_name,
          user_Email: email
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
};
