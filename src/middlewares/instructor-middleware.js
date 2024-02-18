const validateCheckIn = (req, res, next) => {
    if (!req.body.checkInTime || !req.body.instructorId) {
        return res.status(400).json({ message: "Insufficient input parameters" });
    }
    next();
}

const validateCheckOut = (req, res, next) => {
    if (!req.body.checkOutTime || !req.body.instructorId) {
        return res.status(400).json({ message: "Insufficient input parameters" });
    }
    next();
}

const validateGetMonthlyReport = (req, res, next) => {
    if (!req.query.month || !req.query.year) {
        return res.status(400).json({ message: "Insufficient input parameters" });
    }
    next();
}

module.exports = {
    validateCheckIn,
    validateCheckOut,
    validateGetMonthlyReport,
}