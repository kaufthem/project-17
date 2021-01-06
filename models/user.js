'use strict';
const {
  Sequelize //Model
} = require('sequelize');
module.exports = (sequelize) => {
  class User extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Course, { foreignKey: "userId" });
    }
  };
  User.init({
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Enter a valid first name."
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Enter a valid last name."
        }
      }
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email field cannot be empty."
        },
        isEmail: {
          msg: "Enter a valid email address."
        }
      },
      unique: {
        args: true,
        msg: 'This email address is already in use.'
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Enter a valid password."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};