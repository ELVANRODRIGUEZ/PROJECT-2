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

//  Read from "main/basic" folder.

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

//  Read from "main/related" folder.

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

//  Read from "main/mixed" folder.

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

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;