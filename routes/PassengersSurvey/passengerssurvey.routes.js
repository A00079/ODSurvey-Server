const { createPassengersSurvey } = require('./passengerssurvey.controller');
const router = require('express').Router();

// Goods Survey Create
router.post('/create', createPassengersSurvey);

module.exports = router;