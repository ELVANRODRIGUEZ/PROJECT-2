module.exports = function (sequelize, DataTypes) {

    var projects = sequelize.define("projects", {
        project_name: DataTypes.STRING(64),
        description: DataTypes.STRING(128)
    });

    projects.associate = function (models) {
        
        projects.hasMany(models.tasks, {
            foreignKey: {
               name: "task_project",
               allowNull: false
            }
        });
      
    
      };

    return projects;

};