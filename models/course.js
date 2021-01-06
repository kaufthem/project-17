'use strict';
const {
  Sequelize //Model
} = require('sequelize');
module.exports = (sequelize) => {
  class Course extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.User, { foreignKey: "userId"});
    }
  };
  Course.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Enter a valid title."
        }
      }
    },
    decription: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Enter a valid description."
        }
      }
    },
    estimatedTime: {
      type: Sequelize.STRING,
    },
    materialsNeeded: {
      type: Sequelize.STRING,
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};