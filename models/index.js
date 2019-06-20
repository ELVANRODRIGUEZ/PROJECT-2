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


// asdfasdfasdfasdfasd

//  Generate database connection through Sequelize.

if (config.use_env_variable) {

  var sequelize = new Sequelize(process.env[config.use_env_variable]);

} else {

  var sequelize = new Sequelize(

    process.env.DATABASE_2,
    process.env.USER_NAME_2,
    process.env.PASSWORD_2, {
      host: "localhost",
      dialect: "mysql"
    }

  );

}

//  Generate database connection through mysql.

if (config.use_env_variable) {

  var connection = mysql.createConnection(process.env[config.use_env_variable]);

} else {

  var connection = mysql.createConnection({
    host: "localhost",
    port: process.env.PORT_2,
    user: process.env.USER_NAME_2,
    password: process.env.PASSWORD_2,
    database: process.env.DATABASE_2
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
  "db": db,
  "connection": connection
}
