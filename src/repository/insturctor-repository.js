const { InstructorAttendance, sequelize, Sequelize } = require('../models/index');

class InstructorRepository {

    async getActiveCheckIn(filter) {
        const existingCheckIn = await InstructorAttendance.findOne({
            where: filter
        });
        return existingCheckIn;
    }

    async find(filter) {
        const sequelizeFilter = {
            where: filter,
        }
        const instructorCheckInRecord = await InstructorAttendance.findOne(sequelizeFilter);
        return instructorCheckInRecord;
    }

    async checkIn(instructorCheckInData) {
        const instructorCheckInRecord = new InstructorAttendance(instructorCheckInData);
        await instructorCheckInRecord.save();
        return instructorCheckInRecord;
    }
    async checkOut(filter, instructorCheckOutData) {
        const sequelizeFilter = {
            where: filter,
        };
        const instructorCheckInData = await InstructorAttendance.update(instructorCheckOutData, sequelizeFilter);
        return instructorCheckInData;
    }

    async getTotalWorkingHours({ month, year }) {
        const query = `SELECT SUM(TIMESTAMPDIFF(minute,checkInTime,checkOutTime)) AS TOTAL_WORKING_HOURS,INSTRUCTORID FROM INSTRUCTORATTENDANCES WHERE MONTH(checkInTime)=${month} AND YEAR(checkInTime)=${year} AND isCheckedIn = 0 GROUP BY INSTRUCTORID;`;
        const totalWorkingHours = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
        return totalWorkingHours;
    }
}

module.exports = InstructorRepository;