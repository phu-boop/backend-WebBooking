'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Host_Reviews extends Model {
    static associate(models) {
      Host_Reviews.belongsTo(models.User, {
        foreignKey: 'host_id',
        as: 'host'
      });
      Host_Reviews.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Host_Reviews.belongsTo(models.Bookings, {
        foreignKey: 'booking_id',
        as: 'booking'
      });
    }
  }
  Host_Reviews.init({
    host_review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    host_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    booking_id: {
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
    modelName: 'Host_Reviews',
    tableName: 'Host_Reviews',
    timestamps: false,
    underscored: true
  });
  return Host_Reviews;
};