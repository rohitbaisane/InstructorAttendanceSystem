const { InstructorRepository } = require('../repository/index.js');

class InstructorService {

    constructor() {
        this.instructorRepository = new InstructorRepository();
    }
    async checkIn(employeeCheckInData) {
        const instructorCheckInRecord = await this.instructorRepository.checkIn(employeeCheckInData);
        return instructorCheckInRecord;
    }
}

module.exports = InstructorService;