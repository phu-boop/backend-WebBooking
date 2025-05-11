'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    static associate(models) {
      Images.belongsTo(models.Properties, {
        foreignKey: 'property_id',
        as: 'property'
      });
      Images.belongsTo(models.Rooms, {
        foreignKey: 'room_id',
        as: 'room'
      });
      Images.belongsTo(models.Flights, {
        foreignKey: 'flight_id',
        as: 'flight'
      });
      Images.belongsTo(models.Car_Rentals, {
        foreignKey: 'car_rental_id',
        as: 'carRental'
      });
      Images.belongsTo(models.Attractions, {
        foreignKey: 'attraction_id',
        as: 'attraction'
      });
      Images.belongsTo(models.Airport_Taxis, {
        foreignKey: 'taxi_id',
        as: 'taxi'
      });
    }
  }
  Images.init({
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    flight_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    car_rental_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attraction_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    taxi_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    caption: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Images',
    tableName: 'Images',
    timestamps: false,
    underscored: true
  });
  return Images;
};