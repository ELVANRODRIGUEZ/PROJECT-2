const db = require("../models").db;
const Op = require("../models").Op;
const connection = require("../models").connection;

// =================================== Requiring our custom middleware for checking if a user is logged in.

let isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  //*++++++++++++++++++++++++++++++++++++++++++++++++ POST

  // Route for adding a project.
  app.post("/api/:user/projects/add", isAuthenticated, function(req, res) {
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

  // Get all members so they can be added to a new Project.
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

  // Route to get all selected Project Users.
  app.get("/api/project_users/:project", isAuthenticated, function(req, res) {
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

  
  //*++++++++++++++++++++++++++++++++++++++++++++++++ DELETE

  // Route to delete a Tasks (and all relationships) nested in a Project.
  app.delete("/members/:user/info/:project/delete_all_tasks", isAuthenticated, function(
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