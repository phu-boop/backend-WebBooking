'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Flight_Hotel_Packages', {
      package_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flight_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Flights',
          key: 'flight_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Rooms',
          key: 'room_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      total_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      available_packages: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Flight_Hotel_Packages');
  }
};