'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Images', {
      image_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Rooms',
          key: 'room_id'
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
      image_url: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      caption: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Images');
  }
};