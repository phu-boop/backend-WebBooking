'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Attraction_Bookings', {
      attraction_booking_id: {
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
      attraction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Attractions',
          key: 'attraction_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      visit_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      number_of_tickets: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Attraction_Bookings');
  }
};