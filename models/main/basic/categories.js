module.exports = function (sequelize, DataTypes) {

    var categories = sequelize.define("categories", {
        category_name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    });

    return categories;

};