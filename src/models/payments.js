'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    static associate(models) {
      Payments.belongsTo(models.Bookings, {
        foreignKey: 'booking_id',
        as: 'booking'
      });
      Payments.belongsTo(models.Flight_Bookings, {
        foreignKey: 'flight_booking_id',
        as: 'flightBooking'
      });
      Payments.belongsTo(models.Car_Rental_Bookings, {
        foreignKey: 'car_booking_id',
        as: 'carBooking'
      });
      Payments.belongsTo(models.Attraction_Bookings, {
        foreignKey: 'attraction_booking_id',
        as: 'attractionBooking'
      });
      Payments.belongsTo(models.Taxi_Bookings, {
        foreignKey: 'taxi_booking_id',
        as: 'taxiBooking'
      });
      Payments.belongsTo(models.Package_Bookings, {
        foreignKey: 'package_booking_id',
        as: 'packageBooking'
      });
      Payments.hasMany(models.Refunds, {
        foreignKey: 'payment_id',
        as: 'refunds'
      });
      Payments.hasMany(models.Invoices, {
        foreignKey: 'payment_id',
        as: 'invoices'
      });
    }
  }
  Payments.init({
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    flight_booking_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    car_booking_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attraction_booking_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    taxi_booking_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    package_booking_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    payment_method: {
      type: DataTypes.ENUM('credit_card', 'paypal', 'bank_transfer'),
      allowNull: false
    },
    payment_status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      allowNull: false,
      defaultValue: 'pending'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Payments',
    tableName: 'Payments',
    timestamps: false,
    underscored: true
  });
  return Payments;
};