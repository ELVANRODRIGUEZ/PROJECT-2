module.exports = function (sequelize, DataTypes) {

    var tasks_responsibles = sequelize.define("tasks_responsibles", {});

    tasks_responsibles.associate = function (models) {

        tasks_responsibles.belongsTo(models.tasks, {
            foreignKey: {
               name: "task_id",
               allowNull: false
            }

        });

        tasks_responsibles.belongsTo(models.users, {

            foreignKey: {
               name: "responsible",
               allowNull: false
            }

        });

    };

    return tasks_responsibles;

};

