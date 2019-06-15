module.exports = function (sequelize, DataTypes) {

    var users = sequelize.define("users", {
        user_name: DataTypes.STRING(128),
        user_password: DataTypes.STRING(64),
        phone_number: DataTypes.INTEGER,
        email: DataTypes.STRING(128),
        is_admin: DataTypes.BOOLEAN
    });

    return users;

};