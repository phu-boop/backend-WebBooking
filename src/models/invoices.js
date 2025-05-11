'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    static associate(models) {
      Invoices.belongsTo(models.Payments, {
        foreignKey: 'payment_id',
        as: 'payment'
      });
    }
  }
  Invoices.init({
    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    invoice_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    issued_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    pdf_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Invoices',
    tableName: 'Invoices',
    timestamps: false,
    underscored: true
  });
  return Invoices;
};