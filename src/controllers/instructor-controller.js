
const { instructorService } = require('./services/instructorService');

const checkIn = (req, res) => {

    const employeeCheckInData = {
        employeeId: req.body.employeeId,
        checkInTime: req.body.checkInTime,
    }

}

module.exports = {
    checkIn,
}