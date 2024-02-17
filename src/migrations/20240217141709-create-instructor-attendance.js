'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InstructorAttendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      instructorId: {
        type: Sequelize.INTEGER
      },
      checkInTime: {
        type: Sequelize.DATE
      },
      checkOutTime: {
        type: Sequelize.DATE
      },
      isCheckedIn: {
        type: Sequelize.BOOLEAN
      },
      monthId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InstructorAttendances');
  }
};