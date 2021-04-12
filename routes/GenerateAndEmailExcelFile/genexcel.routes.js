const { createExcelSheet } = require('./genexcel.controller');

const router = require('express').Router();

router.post('/read', createExcelSheet);

module.exports = router;