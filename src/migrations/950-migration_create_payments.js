'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      payment_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Bookings',
          key: 'booking_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      flight_booking_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Flight_Bookings',
          key: 'flight_booking_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      car_booking_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Car_Rental_Bookings',
          key: 'car_booking_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      attraction_booking_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Attraction_Bookings',
          key: 'attraction_booking_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      taxi_booking_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Taxi_Bookings',
          key: 'taxi_booking_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      package_booking_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Package_Bookings',
          key: 'package_booking_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      payment_method: {
        type: Sequelize.ENUM('credit_card', 'paypal', 'bank_transfer'),
        allowNull: false
      },
      payment_status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed'),
        allowNull: false,
        defaultValue: 'pending'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    }, {
      engine: 'InnoDB' // Thêm dòng này
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Payments');
  }
};