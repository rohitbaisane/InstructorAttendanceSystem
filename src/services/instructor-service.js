const { InstructorRepository } = require('../repository/index.js');
const { Op } = require('sequelize');

class InstructorService {

    constructor() {
        this.instructorRepository = new InstructorRepository();
    }

    async checkIn(employeeCheckInData) {
        try {
            //check for existing active check in.
            const existingCheckIn = await this.instructorRepository.getActiveCheckIn({
                instructorId: employeeCheckInData.instructorId,
                isCheckedIn: true,
            });

            if (existingCheckIn) {
                const errorObj = new Error("There is already existing check in for instructor");
                errorObj.statusCode = 400;
                throw errorObj;
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
                const errObj = new Error("There is already existing record with overlapping time");
                errObj.statusCode = 400;
                throw errObj;
            }
            const instructorCheckInRecord = await this.instructorRepository.checkIn(employeeCheckInData);
            return instructorCheckInRecord;
        } catch (err) {
            if (err.statusCode && err.statusCode == 400) {
                throw err;
            }
            if (err.name == 'SequelizeDatabaseError') {
                err.message = err.sqlMessage;
                err.statusCode = 400;
                throw err;
            }
            throw new Error("Interal server error");
        }
    }

    async checkOut(employeeCheckOutData) {
        try {
            const { instructorId, checkOutTime } = employeeCheckOutData;

            //check for existing active check in.
            const existingCheckIn = await this.instructorRepository.getActiveCheckIn({ instructorId, isCheckedIn: true });
            if (!existingCheckIn) {
                const errObj = new Error("There is no check in exist for give instructor");
                errObj.statusCode = 400;
                throw errObj;
            }
            if (existingCheckIn && existingCheckIn.checkInTime.getTime() >= new Date(checkOutTime).getTime()) {
                const errObj = new Error("Check in time can't be greater or equal than check out time");
                errObj.statusCode = 400;
                throw errObj;
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
                const errObj = new Error("There is already existing record with overlapping time");
                errObj.statusCode = 400;
                throw errObj;
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
        } catch (err) {
            if (err.statusCode && err.statusCode == 400) {
                throw err;
            }
            if (err.name == 'SequelizeDatabaseError') {
                err.message = err.sqlMessage;
                err.statusCode = 400;
                throw err;
            }
            throw new Error("Interal server error");
        }
    }

    async getTotalWorkingHours({ month, year }) {
        try {
            const monthInfo = new Map([
                ["january", 1], ["february", 2], ["march", 3], ["april", 4],
                ["may", 5], ["june", 6], ["july", 7], ["august", 8],
                ["september", 9], ["october", 10], ["november", 11], ["december", 12],
            ]);
            console.log("running");
            const monthNumber = monthInfo.get(month.toLowerCase());
            if (!monthNumber) {
                const errObj = new Error("Invalid month in input");
                errObj.statusCode = 400;
                throw errObj;
            };

            const instructorTotalWorkingHourse = await this.instructorRepository.getTotalWorkingHours({ month: monthNumber, year });
            return instructorTotalWorkingHourse;
        }
        catch (err) {
            if (err.statusCode && err.statusCode == 400) {
                throw err;
            }
            console.log(err);
            if (err.name == 'SequelizeDatabaseError') {
                err.message = err.sqlMessage;
                err.statusCode = 400;
                throw err;
            }
            throw new Error("Interal server error");
        }
    }

}

module.exports = InstructorService;