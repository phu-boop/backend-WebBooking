'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Host_Bank_Accounts extends Model {
    static associate(models) {
      Host_Bank_Accounts.belongsTo(models.User, {
        foreignKey: 'host_id',
        as: 'host'
      });
    }
  }
  Host_Bank_Accounts.init({
    bank_account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    host_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bank_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    account_number: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    account_holder: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Host_Bank_Accounts',
    tableName: 'Host_Bank_Accounts',
    timestamps: false,
    underscored: true
  });
  return Host_Bank_Accounts;
};