const express = require('express');
const router = express.Router();

const { instructorController } = require('../controllers/index');

router.post('/in', instructorController.checkIn);

router.post('/out', instructorController.checkOut);

router.get('/get-monthly-report', instructorController.getMonthlyReport);

module.exports = router;