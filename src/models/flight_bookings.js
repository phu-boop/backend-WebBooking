'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight_Bookings extends Model {
    static associate(models) {
      Flight_Bookings.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Flight_Bookings.belongsTo(models.Flights, {
        foreignKey: 'flight_id',
        as: 'flight'
      });
      Flight_Bookings.hasMany(models.Payments, {
        foreignKey: 'flight_booking_id',
        as: 'payments'
      });
    }
  }
  Flight_Bookings.init({
    flight_booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    flight_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    number_of_seats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Flight_Bookings',
    tableName: 'Flight_Bookings',
    timestamps: false,
    underscored: true
  });
  return Flight_Bookings;
};