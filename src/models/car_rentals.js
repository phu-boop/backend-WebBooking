'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car_Rentals extends Model {
    static associate(models) {
      Car_Rentals.hasMany(models.Car_Rental_Bookings, {
        foreignKey: 'car_rental_id',
        as: 'carRentalBookings'
      });
      Car_Rentals.hasMany(models.Images, {
        foreignKey: 'car_rental_id',
        as: 'images'
      });
      Car_Rentals.hasMany(models.Reviews, {
        foreignKey: 'car_rental_id',
        as: 'reviews'
      });
    }
  }
  Car_Rentals.init({
    car_rental_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    company: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    car_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    price_per_day: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    available_cars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Car_Rentals',
    tableName: 'Car_Rentals',
    timestamps: false,
    underscored: true
  });
  return Car_Rentals;
};