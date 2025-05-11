'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Translations extends Model {
    static associate(models) {
      // Không có mối quan hệ trực tiếp, liên kết động qua table_name, column_name, record_id
    }
  }
  Translations.init({
    translation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    table_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    column_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    record_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Translations',
    tableName: 'Translations',
    timestamps: false,
    underscored: true
  });
  return Translations;
};