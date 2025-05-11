'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cancellation_Policies extends Model {
    static associate(models) {
      // Không có mối quan hệ trực tiếp, liên kết động qua service_type, service_id
    }
  }
  Cancellation_Policies.init({
    policy_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    service_type: {
      type: DataTypes.ENUM('stay', 'flight', 'car_rental', 'attraction', 'taxi', 'package'),
      allowNull: false
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    free_cancellation_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    cancellation_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Cancellation_Policies',
    tableName: 'Cancellation_Policies',
    timestamps: false,
    underscored: true
  });
  return Cancellation_Policies;
};