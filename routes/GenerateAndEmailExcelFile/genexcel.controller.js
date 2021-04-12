require('dotenv').config();
const { fetchPassengersDetails } = require('./genexcel.service');
const generateAndSendEmail = require('../../utils/generate-excel-send-email');

module.exports = {
    createExcelSheet: async (req, res) => {
        try {
            fetchPassengersDetails("", async (err, goodsDetails,passengersDetails) => {
                if (err) {
                    return res.send({
                        "error": true,
                        "message": "Error while sendig email with excel attachement"
                    })
                }
                await generateAndSendEmail.sendEmail(goodsDetails,passengersDetails);
                return res.send({
                    "error": false,
                    "message": "Email sent successfully!"
                })
            });
        } catch (error) {
            return res.send({
                "error": true,
                "message": "Error while sendig email with excel attachement"
            })
        }
    }
}