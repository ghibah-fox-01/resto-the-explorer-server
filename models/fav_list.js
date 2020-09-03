'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fav_List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Fav_List.init({
    UserId: DataTypes.INTEGER,
    RestoranId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Fav_List',
  });
  return Fav_List;
};