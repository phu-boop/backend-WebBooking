'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Taxes extends Model {
    static associate(models) {
      // Không có mối quan hệ trực tiếp
    }
  }
  Taxes.init({
    tax_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tax_type: {
      type: DataTypes.ENUM('vat', 'city_tax', 'service_fee'),
      allowNull: false
    },
    rate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Taxes',
    tableName: 'Taxes',
    timestamps: false,
    underscored: true
  });
  return Taxes;
};