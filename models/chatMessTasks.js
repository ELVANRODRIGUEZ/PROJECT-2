module.exports = function (sequelize, DataTypes) {

    var chat_mess_tasks = sequelize.define("chat_mess_tasks", {});

    chat_mess_tasks.associate = function (models) {

        chat_mess_tasks.belongsTo(models.tasks, {

            foreignKey: {
               name: "task_id",
               allowNull: false
            }

        });

        chat_mess_tasks.belongsTo(models.chat_messages, {

            foreignKey: {
               name: "chat_mess",
               allowNull: false
            }

        });

    };

    return chat_mess_tasks;

};

