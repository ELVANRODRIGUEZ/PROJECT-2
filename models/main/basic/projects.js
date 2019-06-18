module.exports = function (sequelize, DataTypes) {

    var projects = sequelize.define("projects", {
        project_name: DataTypes.STRING(64),
        description: DataTypes.STRING(128)
    });

    users.associate = function (models) {
        
        projects.hasMany(models.tasks, {
            foreignKey: {
               name: "task_prject",
               allowNull: false
            }
        });
      
    
      };

    return projects;

};