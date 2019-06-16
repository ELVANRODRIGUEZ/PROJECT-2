module.exports = function (sequelize, DataTypes) {

    var chat_messages = sequelize.define("chat_messages", {
        chat_message: {
            type: DataTypes.STRING(1024),
            allowNull: false
        }
    });

    chat_messages.associate = function (models) {
        chat_messages.belongsTo(models.users, {

            foreignKey: {
                name: "message_creator",
                allowNull: false
            }

        });

    }

    return chat_messages;

};