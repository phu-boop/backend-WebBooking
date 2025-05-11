'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cancellation_Policies', {
      policy_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      service_type: {
        type: Sequelize.ENUM('stay', 'flight', 'car_rental', 'attraction', 'taxi', 'package'),
        allowNull: false
      },
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      free_cancellation_days: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      cancellation_fee: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cancellation_Policies');
  }
};