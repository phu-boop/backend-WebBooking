'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlists extends Model {
    static associate(models) {
      Wishlists.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  Wishlists.init({
    wishlist_id: {
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
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Wishlists',
    tableName: 'Wishlists',
    timestamps: false,
    underscored: true
  });
  return Wishlists;
};