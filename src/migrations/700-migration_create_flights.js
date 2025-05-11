'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Flights', {
      flight_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airline: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      departure_city: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      arrival_city: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      departure_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      arrival_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      available_seats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Flights');
  }
};