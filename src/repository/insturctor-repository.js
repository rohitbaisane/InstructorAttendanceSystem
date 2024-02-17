const { InstructorAttendance } = require('../models/index');

class InstructorRepository {

    async checkIn(instructorCheckInData) {
        const instructorCheckInRecord = new InstructorAttendance(instructorCheckInData);
        await instructorCheckInRecord.save();
        return instructorCheckInRecord;
    }
}

module.exports = InstructorRepository;