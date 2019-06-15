module.exports = function (sequelize, DataTypes) {

    var tasks = sequelize.define("tasks", {
        description: DataTypes.STRING(512),
        dead_line: DataTypes.DATE
    });

    tasks.associate = function (models) {
        tasks.belongsTo(models.users, {
            foreignKey: {
               name: "created_by",
               allowNull: false
            }
        });
        tasks.belongsTo(models.categories, {
            foreignKey: {
               name: "task_category",
               allowNull: false
            }
        });
        tasks.belongsTo(models.tasks, {
            foreignKey: {
               name: "parent_id"
            }
        });
    };
    
    return tasks;

};

