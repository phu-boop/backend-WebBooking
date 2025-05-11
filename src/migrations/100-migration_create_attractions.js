'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Attractions', {
      attraction_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      available_tickets: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      engine: 'InnoDB' // Thêm dòng này
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Attractions');
  }
};