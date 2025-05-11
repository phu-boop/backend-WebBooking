'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Property_Amenities', {
      property_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Properties',
          key: 'property_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
      },
      amenity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Amenities',
          key: 'amenity_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Property_Amenities');
  }
};