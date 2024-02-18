const { InstructorRepository } = require('../repository/index.js');
const { Op } = require('sequelize');

class InstructorService {

    constructor() {
        this.instructorRepository = new InstructorRepository();
    }

    async checkIn(employeeCheckInData) {

        //check for existing active check in.
        const existingCheckIn = await this.instructorRepository.getActiveCheckIn({
            instructorId: employeeCheckInData.instructorId,
            isCheckedIn: true,
        });

        if (existingCheckIn) {
            throw new Error({
                message: "There is already existing check in for instructor"
            });
        }

        //check for record with overlapping check in and check out time.
        const overlappingCheckInRecord = await this.instructorRepository.find({
            checkInTime: {
                [Op.lte]: employeeCheckInData.checkInTime,
            },
            checkOutTime: {
                [Op.gte]: employeeCheckInData.checkInTime,
            },
            instructorId: employeeCheckInData.instructorId,
        });
        if (overlappingCheckInRecord) {
            throw new Error({ message: "There is already existing record with overlapping time" });
        }

        const instructorCheckInRecord = await this.instructorRepository.checkIn(employeeCheckInData);
        return instructorCheckInRecord;
    }

    async checkOut(employeeCheckOutData) {

        const { instructorId, checkOutTime } = employeeCheckOutData;

        //check for existing active check in.
        const existingCheckIn = await this.instructorRepository.getActiveCheckIn({ instructorId, isCheckedIn: true });
        if (!existingCheckIn) {
            throw new Error({
                message: "There is no check in exist for give instructor"
            });
        }
        if (existingCheckIn && existingCheckIn.checkInTime.getTime() >= new Date(checkOutTime).getTime()) {
            throw new Error({ message: "Check in time can't be greater or equal than check out time" });
        }

        //check for record with overlapping check in and check out time.
        const overlappingCheckInRecord = await this.instructorRepository.find({
            checkInTime: {
                [Op.gt]: existingCheckIn.checkInTime,
                [Op.lte]: checkOutTime,
            },
            instructorId,
        });

        if (overlappingCheckInRecord) {
            throw new Error({ message: "There is already existing record with overlapping time" });
        }

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