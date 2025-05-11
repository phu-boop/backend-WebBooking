'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Amenities extends Model {
    static associate(models) {
      Amenities.belongsToMany(models.Properties, {
        through: 'Property_Amenities',
        foreignKey: 'amenity_id',
        otherKey: 'property_id',
        as: 'properties'
      });
    }
  }
  Amenities.init({
    amenity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Amenities',
    tableName: 'Amenities',
    timestamps: false,
    underscored: true
  });
  return Amenities;
};