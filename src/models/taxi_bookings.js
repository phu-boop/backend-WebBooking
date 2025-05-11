'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Taxi_Bookings extends Model {
    static associate(models) {
      Taxi_Bookings.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Taxi_Bookings.belongsTo(models.Airport_Taxis, {
        foreignKey: 'taxi_id',
        as: 'taxi'
      });
      Taxi_Bookings.hasMany(models.Payments, {
        foreignKey: 'taxi_booking_id',
        as: 'payments'
      });
    }
  }
  Taxi_Bookings.init({
    taxi_booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    taxi_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pickup_time: {
      type: DataTypes.DATE,
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
    modelName: 'Taxi_Bookings',
    tableName: 'Taxi_Bookings',
    timestamps: false,
    underscored: true
  });
  return Taxi_Bookings;
};