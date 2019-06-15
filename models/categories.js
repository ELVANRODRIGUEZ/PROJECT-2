module.exports = function (sequelize, DataTypes) {

    var categories = sequelize.define("categories", {
        category_name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        description: DataTypes.STRING(128),
    });

    return categories;

};