'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Car_Rentals', {
      car_rental_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      car_type: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      price_per_day: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      available_cars: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Car_Rentals');
  }
};