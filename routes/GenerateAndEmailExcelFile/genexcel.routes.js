const { createExcelSheet } = require('./genexcel.controller');

const router = require('express').Router();

router.post('/create', createExcelSheet);

module.exports = router;