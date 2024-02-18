const express = require('express');
const router = express.Router();

const { instructorController } = require('../controllers/index');
const { instructorMiddlewares } = require('../middlewares/index');

router.post('/in', instructorMiddlewares.validateCheckIn, instructorController.checkIn);

router.post('/out', instructorMiddlewares.validateCheckOut, instructorController.checkOut);

router.get('/get-monthly-report',
    instructorMiddlewares.validateGetMonthlyReport,
    instructorController.getMonthlyReport);

module.exports = router;