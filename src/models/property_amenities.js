'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property_Amenities extends Model {
    static associate(models) {
      Property_Amenities.belongsTo(models.Properties, {
        foreignKey: 'property_id',
        as: 'property'
      });
      Property_Amenities.belongsTo(models.Amenities, {
        foreignKey: 'amenity_id',
        as: 'amenity'
      });
    }
  }
  Property_Amenities.init({
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amenity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Property_Amenities',
    tableName: 'Property_Amenities',
    timestamps: false,
    underscored: true
  });
  return Property_Amenities;
};