module.exports = function (sequelize, DataTypes) {

    var mail_mess_tasks = sequelize.define("mail_mess_tasks", {});

    mail_mess_tasks.associate = function (models) {

        mail_mess_tasks.belongsTo(models.tasks, {

            foreignKey: {
               name: "task_id",
               allowNull: false
            }

        });
       
        mail_mess_tasks.belongsTo(models.mail_messages, {

            foreignKey: {
               name: "mail_mess",
               allowNull: false
            }

        });

    };

    return mail_mess_tasks;

};