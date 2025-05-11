'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    static associate(models) {
      Bookings.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Bookings.belongsTo(models.Rooms, {
        foreignKey: 'room_id',
        as: 'room'
      });
      Bookings.hasMany(models.Payments, {
        foreignKey: 'booking_id',
        as: 'payments'
      });
      Bookings.hasMany(models.Support_Tickets, {
        foreignKey: 'booking_id',
        as: 'supportTickets'
      });
      Bookings.hasMany(models.Host_Reviews, {
        foreignKey: 'booking_id',
        as: 'hostReviews'
      });
      Bookings.hasMany(models.Host_Payouts, {
        foreignKey: 'booking_id',
        as: 'payouts'
      });
    }
  }
  Bookings.init({
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    check_in_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    check_out_date: {
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
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Bookings',
    tableName: 'Bookings',
    timestamps: false,
    underscored: true
  });
  return Bookings;
};