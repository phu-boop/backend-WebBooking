'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    static associate(models) {
      Reviews.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Reviews.belongsTo(models.Airport_Taxis, {
        foreignKey: 'taxi_id',
        as: 'taxi'
      });
    }
  }
  Reviews.init({
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    taxi_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Reviews',
    tableName: 'Reviews',
    timestamps: false,
    underscored: true
  });
  return Reviews;
};