'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotions extends Model {
    static associate(models) {
      // Không có mối quan hệ trực tiếp với bảng khác
    }
  }
  Promotions.init({
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    discount_percent: {
      type: DataTypes.DECIMAL(5, 2),
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Promotions',
    tableName: 'Promotions',
    timestamps: false,
    underscored: true
  });
  return Promotions;
};