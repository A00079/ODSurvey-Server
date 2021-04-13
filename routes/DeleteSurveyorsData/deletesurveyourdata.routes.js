const { deleteSuryorsData } = require('./deletesurveyourdata.controller');
const router = require('express').Router();

// Goods Survey Create
router.post('/delete', deleteSuryorsData);

module.exports = router;