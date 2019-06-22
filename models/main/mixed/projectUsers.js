module.exports = function (sequelize, DataTypes) {

    var project_users = sequelize.define("project_users", {});

    project_users.associate = function (models) {

        project_users.belongsTo(models.projects, {
            foreignKey: {
               name: "project_name",
               allowNull: false
            },
            onDelete: "cascade" // The "onDelete" restriction goes on the "belongsTo" declaration.

        });

        project_users.belongsTo(models.users, {

            foreignKey: {
               name: "user_name",
               allowNull: false
            },
            onDelete: "cascade" // The "onDelete" restriction goes on the "belongsTo" declaration.

        });

    };

    return project_users;

};

