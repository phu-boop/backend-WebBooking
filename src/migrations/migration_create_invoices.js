'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invoices', {
      invoice_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Payments',
          key: 'payment_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      invoice_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      issued_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      pdf_url: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    }, {
      engine: 'InnoDB' // Thêm dòng này
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Invoices');
  }
};