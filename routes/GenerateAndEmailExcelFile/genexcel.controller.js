require('dotenv').config();
const generateAndSendEmail = require('../../utils/generate-excel-send-email');

module.exports = {
    createExcelSheet: async (req, res) => {
        try {
            await generateAndSendEmail.sendEmail();
            return res.send({
                "error": false,
                "message": "Email sent successfully!" 
            })
        } catch (error) {
            return res.send({
                "error": true,
                "message": "Error while sendig email with excel attachement"
            })
        }
    }
}