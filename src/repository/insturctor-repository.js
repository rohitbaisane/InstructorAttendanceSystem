const { InstructorAttendance } = require('../models/index');

class InstructorRepository {

    async getActiveCheckIn(filter) {
        console.log(filter);
        const existingCheckIn = await InstructorAttendance.findOne({
            where: filter
        });
        console.log(existingCheckIn);
        return existingCheckIn;
    }

    async find(filter) {
        const sequelizeFilter = {
            where: filter,
        }
        console.log(filter);
        const instructorCheckInRecord = await InstructorAttendance.findOne(sequelizeFilter);
        console.log(instructorCheckInRecord);
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
        console.log(sequelizeFilter);
        const instructorCheckInData = await InstructorAttendance.update(instructorCheckOutData, sequelizeFilter);
        return instructorCheckInData;
    }
}

module.exports = InstructorRepository;