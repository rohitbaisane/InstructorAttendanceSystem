const { InstructorRepository } = require('../repository/index.js');

class InstructorService {

    constructor() {
        this.instructorRepository = new InstructorRepository();
    }
    async checkIn(employeeCheckInData) {
        const instructorCheckInRecord = await this.instructorRepository.checkIn(employeeCheckInData);
        return instructorCheckInRecord;
    }
    async checkOut(employeeCheckOutData) {
        const { instructorId, checkOutTime } = employeeCheckOutData;
        const filter = {
            isCheckedIn: true,
            instructorId,
        }
        const instructorCheckInRecord = await this.instructorRepository.checkOut(filter, {
            checkOutTime,
            isCheckedIn: false,
        });
        return instructorCheckInRecord;
    }
}

module.exports = InstructorService;