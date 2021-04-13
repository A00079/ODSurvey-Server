require('dotenv').config();
const { deleteData } = require('./deletesurveyourdata.service');

module.exports = {
    deleteSuryorsData: (req, res) => {
        var body = req.body.data;
        deleteData(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err,
                    message: 'DataBase Connection Error'
                });
            }
            return res.status(200).json({
                message: 'Data Deleted Successfully',
                data: results
            });
        });
    }
}