'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Host_Applications extends Model {
    static associate(models) {
      Host_Applications.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  Host_Applications.init({
    application_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    business_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    business_license: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    },
    submitted_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    reviewed_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Host_Applications',
    tableName: 'Host_Applications',
    timestamps: false,
    underscored: true
  });
  return Host_Applications;
};