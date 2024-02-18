
const { InstructorService } = require('../services/index');
const instructorService = new InstructorService();

const checkIn = async (req, res) => {
    try {
        const employeeCheckInData = {
            instructorId: req.body.instructorId,
            checkInTime: req.body.checkInTime,
        };
        const instructorCheckInRecord = await instructorService.checkIn(employeeCheckInData);
        return res.status(200).json(instructorCheckInRecord);
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const checkOut = async (req, res) => {
    try {
        const employeeCheckOutData = {
            instructorId: req.body.instructorId,
            checkOutTime: req.body.checkOutTime,
        }
        const instructorCheckInRecord = await instructorService.checkOut(employeeCheckOutData);
        return res.status(200).json(instructorCheckInRecord);
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const getMonthlyReport = async (req, res) => {
    try {
        const instructorWorkingHoursRecords = await instructorService.getTotalWorkingHours({
            month: req.query.month,
            year: req.query.year,
        });
        return res.status(200).json(instructorWorkingHoursRecords);
    }
    catch (err) {
        return res.status(err.statusCode || 500).send({ messagee: err.message });
    }
}

module.exports = {
    checkIn,
    checkOut,
    getMonthlyReport,
}