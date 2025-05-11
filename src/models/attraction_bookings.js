'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attraction_Bookings extends Model {
    static associate(models) {
      Attraction_Bookings.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Attraction_Bookings.belongsTo(models.Attractions, {
        foreignKey: 'attraction_id',
        as: 'attraction'
      });
      Attraction_Bookings.hasMany(models.Payments, {
        foreignKey: 'attraction_booking_id',
        as: 'payments'
      });
    }
  }
  Attraction_Bookings.init({
    attraction_booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attraction_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    visit_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    number_of_tickets: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Attraction_Bookings',
    tableName: 'Attraction_Bookings',
    timestamps: false,
    underscored: true
  });
  return Attraction_Bookings;
};