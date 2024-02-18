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
                throw new Error({
                    message: "There is already existing check in for instructor",
                    statusCode: 400,
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
                throw new Error({
                    message: "There is already existing record with overlapping time",
                    stautsCode: 400
                });
            }
            const instructorCheckInRecord = await this.instructorRepository.checkIn(employeeCheckInData);
            return instructorCheckInRecord;
        } catch (err) {
            if (err.name == 'SequelizeDatabaseError') {
                throw new Error({
                    message: err.sqlMessage,
                    statusCode: 400
                })
            }
            throw new Error({ message: "Interal server error", statuscode: 500 });
        }
    }

    async checkOut(employeeCheckOutData) {
        try {
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
        } catch (err) {
            if (err.name == 'SequelizeDatabaseError') {
                throw new Error({
                    message: err.sqlMessage,
                    statusCode: 400
                })
            }
            throw new Error({ message: "Interal server error", statuscode: 500 });
        }
    }

    async getTotalWorkingHours({ month, year }) {
        try {
            const monthInfo = new Map([
                ["january", 1], ["february", 2], ["march", 3], ["april", 4],
                ["may", 5], ["june", 6], ["july", 7], ["august", 8],
                ["september", 9], ["october", 10], ["november", 11], ["december", 12],
            ]);

            const monthNumber = monthInfo.get(month.toLowerCase());
            console.log(monthNumber);
            if (!monthNumber) throw new Error({ message: "Invalid month in input" });

            const instructorTotalWorkingHourse = await this.instructorRepository.getTotalWorkingHours({ month: monthNumber, year });
            return instructorTotalWorkingHourse;
        }
        catch (err) {
            if (err.name == 'SequelizeDatabaseError') {
                throw new Error({
                    message: err.sqlMessage,
                    statusCode: 400
                })
            }
            throw new Error({ message: "Interal server error", statuscode: 500 });
        }
    }

}

module.exports = InstructorService;