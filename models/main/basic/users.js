var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
  user_name:{
    type: DataTypes.STRING,
    //allowNull: false,
  },
  phone_number:{
    type: DataTypes.STRING, 
    //allowNull: false,
  },
   email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
  validate: {
  isEmail: true
  }
  },
  password: {
  type: DataTypes.STRING,
  allowNull: false
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
  }, {
  hooks: {
  beforeCreate: function(users) {
  users.password = bcrypt.hashSync(users.password, bcrypt.genSaltSync(10), null);
  }
  }
  })
  
  // Creating a custom method for our User model. 
  //This will check if an unhashed password entered by the 
  //user can be compared to the hashed password stored in our database
  users.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  /*
  User.hook("beforeCreate", function(user) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  */
  return users;
  };