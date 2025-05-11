'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Properties extends Model {
    static associate(models) {
      Properties.belongsTo(models.User, {
        foreignKey: 'host_id',
        as: 'host'
      });
      Properties.hasMany(models.Rooms, {
        foreignKey: 'property_id',
        as: 'rooms'
      });
      Properties.hasMany(models.Bookings, {
        foreignKey: 'property_id',
        as: 'bookings'
      });
      Properties.hasMany(models.Reviews, {
        foreignKey: 'property_id',
        as: 'reviews'
      });
      Properties.hasMany(models.Images, {
        foreignKey: 'property_id',
        as: 'images'
      });
      Properties.hasMany(models.Flight_Hotel_Packages, {
        foreignKey: 'property_id',
        as: 'packages'
      });
      Properties.belongsToMany(models.Amenities, {
        through: 'Property_Amenities',
        foreignKey: 'property_id',
        otherKey: 'amenity_id',
        as: 'amenities'
      });
    }
  }
  Properties.init({
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    host_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true
    },
    property_type: {
      type: DataTypes.ENUM('apartment', 'house', 'hotel', 'bnb', 'other'),
      allowNull: false
    },
    star_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Properties',
    tableName: 'Properties',
    timestamps: false,
    underscored: true,
    hooks: {
      beforeUpdate: async (property, options) => {
        property.updated_at = new Date();
      }
    }
  });
  return Properties;
};