'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restoran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Restoran.init({
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    rate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restoran',
  });
  return Restoran;
};