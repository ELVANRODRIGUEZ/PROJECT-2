module.exports = function (sequelize, DataTypes) {

    var projects = sequelize.define("projects", {
        project_name: DataTypes.STRING(64),
        description: DataTypes.STRING(128)
    });

    return projects;

};