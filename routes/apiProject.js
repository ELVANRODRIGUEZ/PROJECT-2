const db = require("../models").db;
const Op = require("../models").Op;
const connection = require("../models").connection;

// =================================== Requiring our custom middleware for checking if a user is logged in.

let isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  //*++++++++++++++++++++++++++++++++++++++++++++++++ POST

  //? Route for adding a Project.
  //> Request from: "../client/src/components/NewProjectModal/index.js"
  app.post("/api/project/add/:user", isAuthenticated, function(req, res) {
    let {user} = req.params;
    let {name} = req.body;
    let {description} = req.body;
    let proyUsers = JSON.parse(req.body.project_users);

    //Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(user);
    // console.log(proyUsers);
    // console.log(description);
    // console.log(name);
    // console.log("++++++++++++++++++++++++++++++++");

    db.projects
      .create({
        project_name: name,
        description: description
      })
      .then(function(project) {
        res.json(project);

        let projectRel = [];

        projectRel.push({
          project_name: project.id,
          user_name: user
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

  // This function relates the selected Users to the newly created Project.
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

  
  //*++++++++++++++++++++++++++++++++++++++++++++++++ GET

  //? Get all members so they can be added to a new Project.
  //> Request from: "../client/src/pages/Members.js"
  app.get("/api/project/get/all_members", isAuthenticated, function(req, res) {
    let {id} = req.user;

    // Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(id);
    // console.log("++++++++++++++++++++++++++++++++");


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

  //? Route to get all selected Project Users.
  //> Request from: "../client/src/pages/Members.js"
  app.get("/api/project/get/project_users/:project", isAuthenticated, function(req, res) {
    let {project} = req.params;

    db.project_users
      .findAll({
        attributes: [["user_name", "user_id"]],
        where: {
          project_name: project
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
                  project_name: project
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

  
  //*++++++++++++++++++++++++++++++++++++++++++++++++ DELETE

  //? Route to delete all Tasks nested in a Project for the logged User.
  //> Request from: "../client/src/components/DeleteProjectModal/index.js"
  app.delete("/api/project/delete/all_tasks/:user/:project", isAuthenticated, function(
    req,
    res
  ) {
    let {user} = req.params;
    let {project} = req.params;

    //  Test console.
    // console.log("++++++++++++++++++++++++++++++++");
    // console.log(user);
    // console.log("++++++++++++++++++++++++++++++++");

    db.tasks
      .findAll({
        where: {
          task_project: project
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
              responsible: user
            }
          })
          .then(function(data2) {
            res.send("all User's Project Tasks Deleted");
          });
      });
  });

};