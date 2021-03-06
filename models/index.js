"use strict";

var fs = require("fs");
var util = require("util");
var path = require("path");
var mysql = require("mysql");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "production";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};


// console.log("config\n",config);

//  Generate database connection through Sequelize.

if (config.use_env_variable) {

  var sequelize = new Sequelize(process.env[config.use_env_variable]);

} else {

  var sequelize = new Sequelize(

    process.env.DATABASE,
    process.env.USER_NAME,
    process.env.PASSWORD, {
      logging: false,
      host: process.env.HOST,
      dialect: "mysql"
    }
    );

}

//  Generate database connection through mysql.

if (config.use_env_variable) {

  var connection = mysql.createConnection(process.env[config.use_env_variable]);

} else {

  var connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.dbPORT,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

}

connection.connect(function (err) {
	if (err) {
		console.error("error connecting: " + err.stack);
		return;
	}

  console.log("connected as id " + connection.threadId);
  
});

//  Read models from "main/basic" folder.

fs.readdirSync(path.join(__dirname, "./main/basic/"))
  .filter(function (file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, "./main/basic/" + file));
    db[model.name] = model;
  });

//  Read models from "main/related" folder.

fs.readdirSync(path.join(__dirname, "./main/related/"))
  .filter(function (file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, "./main/related/" + file));
    db[model.name] = model;
  });

//  Read models from "main/mixed" folder.

fs.readdirSync(path.join(__dirname, "./main/mixed/"))
  .filter(function (file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, "./main/mixed/" + file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {  // Iteration among all the property names "db" object has so far.
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
  "Op": Op,
  "db": db,
  "connection": connection,
  Chats: require("./mongo/chats"),
  Mails: require("./mongo/mails")
}
