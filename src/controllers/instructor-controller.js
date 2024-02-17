
const { InstructorService } = require('../services/index');
const instructorService = new InstructorService();

const checkIn = async (req, res) => {
    const employeeCheckInData = {
        instructorId: req.body.instructorId,
        checkInTime: req.body.checkInTime,
    };
    const instructorCheckInRecord = await instructorService.checkIn(employeeCheckInData);
    return res.status(200).json(instructorCheckInRecord);
}

module.exports = {
    checkIn,
}