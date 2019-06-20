var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
  user_name:{
    type: DataTypes.STRING,
    validate:{
      len: [2]
    }
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
 
  return users;
  };