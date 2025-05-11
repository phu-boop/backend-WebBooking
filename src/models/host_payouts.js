'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Host_Payouts extends Model {
    static associate(models) {
      Host_Payouts.belongsTo(models.User, {
        foreignKey: 'host_id',
        as: 'host'
      });
      Host_Payouts.belongsTo(models.Bookings, {
        foreignKey: 'booking_id',
        as: 'booking'
      });
    }
  }
  Host_Payouts.init({
    payout_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    host_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    commission_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      allowNull: false,
      defaultValue: 'pending'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    paid_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Host_Payouts',
    tableName: 'Host_Payouts',
    timestamps: false,
    underscored: true
  });
  return Host_Payouts;
};