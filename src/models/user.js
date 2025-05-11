'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Định nghĩa mối quan hệ
      User.hasMany(models.Host_Applications, {
        foreignKey: 'user_id',
        as: 'hostApplications'
      });
      User.hasMany(models.Properties, {
        foreignKey: 'host_id',
        as: 'properties'
      });
      User.hasMany(models.Bookings, {
        foreignKey: 'user_id',
        as: 'bookings'
      });
      User.hasMany(models.Flight_Bookings, {
        foreignKey: 'user_id',
        as: 'flightBookings'
      });
      User.hasMany(models.Car_Rental_Bookings, {
        foreignKey: 'user_id',
        as: 'carRentalBookings'
      });
      User.hasMany(models.Attraction_Bookings, {
        foreignKey: 'user_id',
        as: 'attractionBookings'
      });
      User.hasMany(models.Taxi_Bookings, {
        foreignKey: 'user_id',
        as: 'taxiBookings'
      });
      User.hasMany(models.Package_Bookings, {
        foreignKey: 'user_id',
        as: 'packageBookings'
      });
      User.hasMany(models.Reviews, {
        foreignKey: 'user_id',
        as: 'reviews'
      });
      // Xóa mối quan hệ với Translations nếu không cần thiết
      // User.hasMany(models.Translations, {
      //   foreignKey: 'user_id',
      //   as: 'translations'
      // });
      User.hasMany(models.Host_Reviews, {
        foreignKey: 'host_id',
        as: 'hostReviews'
      });
      User.hasMany(models.Host_Bank_Accounts, {
        foreignKey: 'host_id',
        as: 'bankAccounts'
      });
      User.hasMany(models.Host_Payouts, {
        foreignKey: 'host_id',
        as: 'payouts'
      });
      User.hasMany(models.Search_History, {
        foreignKey: 'user_id',
        as: 'searchHistory'
      });
      User.hasMany(models.Wishlists, {
        foreignKey: 'user_id',
        as: 'wishlists'
      });
      User.hasMany(models.Support_Tickets, {
        foreignKey: 'user_id',
        as: 'supportTickets'
      });
      User.hasMany(models.Notifications, {
        foreignKey: 'user_id',
        as: 'notifications'
      });
    }
  };

  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true // Cột id là khóa chính
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password'
    },
    // ... các trường khác ...
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: async (user, options) => {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        user.password_hash = await bcrypt.hash(user.password_hash, saltRounds);
      },
      beforeUpdate: async (user, options) => {
        user.updated_at = new Date();
      }
    }
  });

  return User;
};