'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Package_Bookings extends Model {
    static associate(models) {
      Package_Bookings.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Package_Bookings.belongsTo(models.Flight_Hotel_Packages, {
        foreignKey: 'package_id',
        as: 'package'
      });
      Package_Bookings.hasMany(models.Payments, {
        foreignKey: 'package_booking_id',
        as: 'payments'
      });
    }
  }
  Package_Bookings.init({
    package_booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
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
    modelName: 'Package_Bookings',
    tableName: 'Package_Bookings',
    timestamps: false,
    underscored: true
  });
  return Package_Bookings;
};