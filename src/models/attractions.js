'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attractions extends Model {
    static associate(models) {
      Attractions.hasMany(models.Attraction_Bookings, {
        foreignKey: 'attraction_id',
        as: 'attractionBookings'
      });
      Attractions.hasMany(models.Images, {
        foreignKey: 'attraction_id',
        as: 'images'
      });
      Attractions.hasMany(models.Reviews, {
        foreignKey: 'attraction_id',
        as: 'reviews'
      });
    }
  }
  Attractions.init({
    attraction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    available_tickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Attractions',
    tableName: 'Attractions',
    timestamps: false,
    underscored: true
  });
  return Attractions;
};