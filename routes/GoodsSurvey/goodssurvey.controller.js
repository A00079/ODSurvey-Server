require('dotenv').config();
const { create } = require('./goodssurvey.service');

module.exports = {
    createGoodsSurvey: (req, res) => {
        var body = req.body.data;
        create(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err,
                    message: 'DataBase Connection Error'
                });
            }
            return res.status(200).json({
                message: 'Goods Saved Successfully',
                data: results
            });
        });
    }
}