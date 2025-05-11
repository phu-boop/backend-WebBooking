'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Taxi_Bookings', {
      taxi_booking_id: {
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
      taxi_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Airport_Taxis',
          key: 'taxi_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      pickup_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      total_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Taxi_Bookings');
  }
};