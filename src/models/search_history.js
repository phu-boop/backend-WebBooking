'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Search_History extends Model {
    static associate(models) {
      Search_History.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  Search_History.init({
    search_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    service_type: {
      type: DataTypes.ENUM('stay', 'flight', 'car_rental', 'attraction', 'taxi', 'package'),
      allowNull: false
    },
    query: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Search_History',
    tableName: 'Search_History',
    timestamps: false,
    underscored: true
  });
  return Search_History;
};