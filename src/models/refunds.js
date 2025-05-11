'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Refunds extends Model {
    static associate(models) {
      Refunds.belongsTo(models.Payments, {
        foreignKey: 'payment_id',
        as: 'payment'
      });
    }
  }
  Refunds.init({
    refund_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'rejected'),
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
    modelName: 'Refunds',
    tableName: 'Refunds',
    timestamps: false,
    underscored: true
  });
  return Refunds;
};