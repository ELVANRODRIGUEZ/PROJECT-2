module.exports = function (sequelize, DataTypes) {

    var tasks_responsibles = sequelize.define("tasks_responsibles", {});

    tasks_responsibles.associate = function (models) {

        tasks_responsibles.belongsTo(models.Tasks, {
            foreignKey: {
               name: "task_id",
               allowNull: false
            }

        });

        tasks_responsibles.belongsTo(models.Users, {

            foreignKey: {
               name: "responsible",
               allowNull: false
            }

        });

    };

    return tasks_responsibles;

};

