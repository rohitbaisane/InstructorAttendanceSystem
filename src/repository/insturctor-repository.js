const { InstructorAttendance } = require('../models/index');

class InstructorRepository {
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