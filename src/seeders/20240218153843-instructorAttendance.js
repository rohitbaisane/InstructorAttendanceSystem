'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('InstructorAttendances', [{
      instructorId: 1,
      checkInTime: '2024-01-18T14:50:00+00:00',
      checkOutTime: '2024-01-18T15:50:00+00:00',
      isCheckedIn: false,
    }, {
      instructorId: 1,
      checkInTime: '2024-01-18T10:50:00+00:00',
      checkOutTime: '2024-01-18T11:50:00+00:00',
      isCheckedIn: false,
    },
    {
      instructorId: 1,
      checkInTime: '2024-02-18T12:50:00+00:00',
      checkOutTime: '2024-02-18T15:50:00+00:00',
      isCheckedIn: false,
    },
    {
      instructorId: 1,
      checkInTime: '2024-02-18T18:00:00+00:00',
      checkOutTime: '2024-02-18T19:50:00+00:00',
      isCheckedIn: false,
    }, {
      instructorId: 2,
      checkInTime: '2024-01-18T14:50:00+00:00',
      checkOutTime: '2024-01-18T15:50:00+00:00',
      isCheckedIn: false,
    }, {
      instructorId: 2,
      checkInTime: '2024-01-18T10:50:00+00:00',
      checkOutTime: '2024-01-18T11:50:00+00:00',
      isCheckedIn: false,
    },
    {
      instructorId: 2,
      checkInTime: '2024-02-18T12:50:00+00:00',
      checkOutTime: '2024-02-18T15:50:00+00:00',
      isCheckedIn: false,
    },
    {
      instructorId: 2,
      checkInTime: '2024-02-18T18:00:00+00:00',
      checkOutTime: '2024-02-18T19:50:00+00:00',
      isCheckedIn: false,
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
