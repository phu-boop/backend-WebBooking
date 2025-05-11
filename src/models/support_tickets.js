'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Support_Tickets extends Model {
    static associate(models) {
      Support_Tickets.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Support_Tickets.belongsTo(models.Bookings, {
        foreignKey: 'booking_id',
        as: 'booking'
      });
    }
  }
  Support_Tickets.init({
    ticket_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('open', 'in_progress', 'resolved'),
      allowNull: false,
      defaultValue: 'open'
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
    modelName: 'Support_Tickets',
    tableName: 'Support_Tickets',
    timestamps: false,
    underscored: true,
    hooks: {
      beforeUpdate: async (ticket, options) => {
        ticket.updated_at = new Date();
      }
    }
  });
  return Support_Tickets;
};