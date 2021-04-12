const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


const GenerateExcelAndSendEmail = require('./routes/GenerateAndEmailExcelFile/genexcel.routes');
const CreatePassengersSurvey = require('./routes/PassengersSurvey/passengerssurvey.routes');
const CreateGoodsSurvey = require('./routes/GoodsSurvey/goodssurvey.routes');


// Routes
app.use('/api/v1/odsurvey/excelsheet', GenerateExcelAndSendEmail);
app.use('/api/v1/odsurvey/passengers', CreatePassengersSurvey);
app.use('/api/v1/odsurvey/goods', CreateGoodsSurvey);


if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

}

app.listen(port, () => {
    console.log(`Server Running at ${port}`);
});