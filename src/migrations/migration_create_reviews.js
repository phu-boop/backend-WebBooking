'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      review_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      property_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Properties',
          key: 'property_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      flight_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Flights',
          key: 'flight_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      car_rental_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Car_Rentals',
          key: 'car_rental_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      attraction_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Attractions',
          key: 'attraction_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      taxi_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Airport_Taxis',
          key: 'taxi_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews');
  }
};