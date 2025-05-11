'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport_Taxis extends Model {
    static associate(models) {
      Airport_Taxis.hasMany(models.Taxi_Bookings, {
        foreignKey: 'taxi_id',
        as: 'taxiBookings'
      });
      Airport_Taxis.hasMany(models.Images, {
        foreignKey: 'taxi_id',
        as: 'images'
      });
      Airport_Taxis.hasMany(models.Reviews, {
        foreignKey: 'taxi_id',
        as: 'reviews'
      });
    }
  }
  Airport_Taxis.init({
    taxi_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    airport: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    available_taxis: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Airport_Taxis',
    tableName: 'Airport_Taxis',
    timestamps: false,
    underscored: true
  });
  return Airport_Taxis;
};