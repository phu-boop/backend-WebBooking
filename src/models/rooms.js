'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    static associate(models) {
      Rooms.belongsTo(models.Properties, {
        foreignKey: 'property_id',
        as: 'property'
      });
      Rooms.hasMany(models.Bookings, {
        foreignKey: 'room_id',
        as: 'bookings'
      });
      Rooms.hasMany(models.Images, {
        foreignKey: 'room_id',
        as: 'images'
      });
      Rooms.hasMany(models.Flight_Hotel_Packages, {
        foreignKey: 'room_id',
        as: 'packages'
      });
    }
  }
  Rooms.init({
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    room_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price_per_night: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    available_rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Rooms',
    tableName: 'Rooms',
    timestamps: false,
    underscored: true
  });
  return Rooms;
};