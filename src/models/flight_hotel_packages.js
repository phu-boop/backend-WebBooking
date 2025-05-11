'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight_Hotel_Packages extends Model {
    static associate(models) {
      Flight_Hotel_Packages.belongsTo(models.Flights, {
        foreignKey: 'flight_id',
        as: 'flight'
      });
      Flight_Hotel_Packages.belongsTo(models.Properties, {
        foreignKey: 'property_id',
        as: 'property'
      });
      Flight_Hotel_Packages.belongsTo(models.Rooms, {
        foreignKey: 'room_id',
        as: 'room'
      });
      Flight_Hotel_Packages.hasMany(models.Package_Bookings, {
        foreignKey: 'package_id',
        as: 'packageBookings'
      });
    }
  }
  Flight_Hotel_Packages.init({
    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    flight_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    available_packages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Flight_Hotel_Packages',
    tableName: 'Flight_Hotel_Packages',
    timestamps: false,
    underscored: true
  });
  return Flight_Hotel_Packages;
};