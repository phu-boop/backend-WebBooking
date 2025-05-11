'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flights extends Model {
    static associate(models) {
      Flights.hasMany(models.Flight_Bookings, {
        foreignKey: 'flight_id',
        as: 'flightBookings'
      });
      Flights.hasMany(models.Images, {
        foreignKey: 'flight_id',
        as: 'images'
      });
      Flights.hasMany(models.Reviews, {
        foreignKey: 'flight_id',
        as: 'reviews'
      });
      Flights.hasMany(models.Flight_Hotel_Packages, {
        foreignKey: 'flight_id',
        as: 'packages'
      });
    }
  }
  Flights.init({
    flight_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    airline: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    departure_city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    arrival_city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    departure_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    arrival_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    available_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Flights',
    tableName: 'Flights',
    timestamps: false,
    underscored: true
  });
  return Flights;
};