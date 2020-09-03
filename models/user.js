'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Restoran, { through: 'fav_lists' })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          // args: /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
          msg: "Email Invalid"
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        try {
          const salt = bcrypt.genSaltSync(10)
          console.log(salt)
          user.password = bcrypt.hashSync(user.password, salt)
        } catch (err) {
          console.log(err)
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
