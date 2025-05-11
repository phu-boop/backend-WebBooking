'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car_Rental_Bookings extends Model {
    static associate(models) {
      Car_Rental_Bookings.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Car_Rental_Bookings.belongsTo(models.Car_Rentals, {
        foreignKey: 'car_rental_id',
        as: 'carRental'
      });
      Car_Rental_Bookings.hasMany(models.Payments, {
        foreignKey: 'car_booking_id',
        as: 'payments'
      });
    }
  }
  Car_Rental_Bookings.init({
    car_booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    car_rental_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
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
    modelName: 'Car_Rental_Bookings',
    tableName: 'Car_Rental_Bookings',
    timestamps: false,
    underscored: true
  });
  return Car_Rental_Bookings;
};