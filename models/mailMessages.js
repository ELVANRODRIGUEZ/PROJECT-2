module.exports = function (sequelize, DataTypes) {

    var mail_messages = sequelize.define("mail_messages", {
        mail_message: {
            type: DataTypes.STRING(2048),
            allowNull: false
        }
    });

    mail_messages.associate = function (models) {
        mail_messages.belongsTo(models.users, {

            foreignKey: {
                name: "creator",
                allowNull: false
            }

        });

    }

    return mail_messages;

};