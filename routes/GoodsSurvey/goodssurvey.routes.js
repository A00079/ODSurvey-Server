const { createGoodsSurvey } = require('./goodssurvey.controller');
const router = require('express').Router();

// Goods Survey Create
router.post('/create', createGoodsSurvey);

module.exports = router;