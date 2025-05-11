'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      room_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      property_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Properties',
          key: 'property_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      room_type: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price_per_night: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      available_rooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rooms');
  }
};