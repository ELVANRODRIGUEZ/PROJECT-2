module.exports = function (sequelize, DataTypes) {

    var tasks = sequelize.define("tasks", {
        description: DataTypes.STRING(512),
        dead_line: DataTypes.DATE,
        accomplished: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0,
                max: 1 
            },
            defaultValue: 0
        }
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
        tasks.belongsTo(models.projects, {
            foreignKey: {
               name: "task_project",
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
