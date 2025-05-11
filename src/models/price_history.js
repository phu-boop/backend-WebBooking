'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Price_History extends Model {
    static associate(models) {
      // Không có mối quan hệ trực tiếp, liên kết động qua service_type, service_id
    }
  }
  Price_History.init({
    price_id: {
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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Price_History',
    tableName: 'Price_History',
    timestamps: false,
    underscored: true
  });
  return Price_History;
};