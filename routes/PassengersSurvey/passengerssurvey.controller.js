require('dotenv').config();
const { create } = require('./passengerssurvey.service');

module.exports = {
    createPassengersSurvey: (req, res) => {
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
                message: 'Passengers Saved Successfully',
                data: results
            });
        });
    }
}