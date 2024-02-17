const { InstructorRepository } = require('./repository/index.js');

class instructorService {

    constructor() {
        this.instructorRepository = new InstructorRepository();
    }
    async instructorCheckIn() {
        await this.instructorRepository.instructorCheckIn();
    }
}