module.exports = function (sequelize, DataTypes) {

    var mail_messages = sequelize.define("mail_messages", {
        mail_message: {
            type: DataTypes.STRING(2048),
            allowNull: false
        }
    });

    return mail_messages;

};