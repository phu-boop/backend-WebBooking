'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Taxes', {
      tax_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      tax_type: {
        type: Sequelize.ENUM('vat', 'city_tax', 'service_fee'),
        allowNull: false
      },
      rate: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Taxes');
  }
};