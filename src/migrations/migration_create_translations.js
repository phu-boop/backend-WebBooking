'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Translations', {
      translation_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      table_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      column_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      record_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      language: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Translations');
  }
};