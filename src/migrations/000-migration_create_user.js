'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'password'
      },
      first_name: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      role: {
        type: Sequelize.ENUM('customer', 'host', 'admin'),
        allowNull: false,
        defaultValue: 'customer'
      },
      business_name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      business_license: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }, {
      engine: 'InnoDB' // Thêm dòng này
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};