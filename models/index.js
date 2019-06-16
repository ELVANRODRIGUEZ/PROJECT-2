"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "production";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

if (config.use_env_variable) {

  var sequelize = new Sequelize(process.env[config.use_env_variable]);

} else {

  var sequelize = new Sequelize(

    process.env.DATABASE,
    process.env.USER_NAME,
    process.env.PASSWORD, {
      host: process.env.HOST,
      dialect: "mysql"
    }

  );

}

// fs.readdirSync(__dirname)
//   .filter(function (file) {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach(function (file) {
//     var model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

db = {
  Users: sequelize.import(path.join(__dirname, "./main/basic/users.js")),
  Projects: sequelize.import(path.join(__dirname, "./main/basic/projects.js")),
  Categories: sequelize.import(path.join(__dirname, "./main/basic/categories.js")),
  Tasks: sequelize.import(path.join(__dirname, "./main/related/tasks.js")),
  MailMessages: sequelize.import(path.join(__dirname, "./main/related/mailMessages.js")),
  ChatMessages: sequelize.import(path.join(__dirname, "./main/related/chatMessages.js")),
  ProjectUsers: sequelize.import(path.join(__dirname, "./main/mixed/projectUsers.js")),
  TasksResponsables: sequelize.import(path.join(__dirname, "./main/mixed/tasksResponsibles.js")),
  ChatMessagesByTask: sequelize.import(path.join(__dirname, "./main/mixed/chatMessTasks.js")),
  MailMessagesByTask: sequelize.import(path.join(__dirname, "./main/mixed/mailMessTasks.js"))
};

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;