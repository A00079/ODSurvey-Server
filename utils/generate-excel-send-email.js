const nodemailer = require('nodemailer')
const Excel = require('exceljs');
const { fetchPassengersDetails } = require('../routes/GenerateAndEmailExcelFile/genexcel.service');

const sendEmail = async (goodsDetails, passengersDetails) => {
    console.log('goodsDetails =======>', goodsDetails);
    console.log('passengersDetails =======>', passengersDetails);

    let od_passengers = 'Passengers.xlsx';
    let od_goods = 'Goods.xlsx';

    let passengers_workbook = new Excel.Workbook();
    let goods_workbook = new Excel.Workbook();

    let passengers_worksheet = passengers_workbook.addWorksheet('Passengers');
    let goods_worksheet = goods_workbook.addWorksheet('Goods');

    goods_worksheet.columns = [
        { header: 'Sr.no.', key: 'srno' },
        { header: 'Surveyor Name', key: 'surveyorid' },
        { header: 'Time of Interview (समय)', key: 'createdat' },
        { header: 'Vehicle Type (वाहन के प्रकार)', key: 'vechicletype' },
        { header: 'Reg No. (रजिस्टर नंबर)', key: 'regno' },
        { header: 'Village / Town (गांव / शहर)', key: 'originvillage' },
        { header: 'District', key: 'origindistrict' },
        { header: 'State', key: 'originstate' },
        { header: 'Village / Town (गांव / शहर)', key: 'destinationvillage' },
        { header: 'District', key: 'destinationdistrict' },
        { header: 'State', key: 'destinationstate' },
        { header: 'Trip Length (KM) (लंबाई यात्रा)', key: 'triplength' },
        { header: 'Travel Time', key: 'traveltime' },
        { header: 'D/W/m/Y', key: 'dwmy' },
        { header: 'No. of trips (यात्राओं की संख्या)', key: 'nooftrips' },
        { header: 'Commodity', key: 'commoditytype' },
        { header: 'Weight', key: 'weight' },
        { header: 'Vehicle Ownership', key: 'vechicleowernship' }
    ];
    let goods_data = [];
    goodsDetails.map((el, index) => {
        goods_data.push(
            {
                "srno": index + 1,
                "surveyorid": el.userid,
                "vechicletype": el.vechicletype,
                "regno": el.regno,
                "originvillage": el.originvillage,
                "origindistrict": el.origindistrict,
                "originstate": el.originstate,
                "destinationvillage": el.destinationvillage,
                "destinationdistrict": el.destinationdistrict,
                "destinationstate": el.destinationstate,
                "triplength": el.triplength,
                "traveltime": el.traveltime,
                "dwmy": el.dwmy,
                "nooftrips": el.nooftrips,
                "commoditytype": el.commoditytype,
                "weight": el.weight,
                "vechicleowernship": el.vechicleowernship,
                "createdat": el.createdat
            }
        )
    });


    passengers_worksheet.columns = [
        { header: 'Sr.no.', key: 'srno' },
        { header: 'Surveyor Name', key: 'surveyorid' },
        { header: 'Time of Interview (समय)', key: 'createdat' },
        { header: 'Vehicle Type (वाहन के प्रकार)', key: 'vechicletype' },
        { header: 'Reg No. (रजिस्टर नंबर)', key: 'regno' },
        { header: 'Village / Town (गांव / शहर)', key: 'originvillage' },
        { header: 'District', key: 'origindistrict' },
        { header: 'State', key: 'originstate' },
        { header: 'Village / Town (गांव / शहर)', key: 'destinationvillage' },
        { header: 'District', key: 'destinationdistrict' },
        { header: 'State', key: 'destinationstate' },
        { header: 'Trip Length (KM) (लंबाई यात्रा)', key: 'triplength' },
        { header: 'Travel Time', key: 'traveltime' },
        { header: 'Ticket Type (S/D/M/LS/LP)', key: 'tickettype' },
        { header: 'Trip Frequency', key: 'tripfreqency' },
        { header: 'No. of trips (यात्राओं की संख्या)', key: 'nooftrips' },
        { header: 'Round Trip on the same day (Y/N) [वापसी (हाँ/नहीं)]', key: 'roundtripsameday' },
        { header: 'Trip Puspose (यात्रा इरादा)', key: 'trippurpose' },
        { header: 'Occupancy (लोग)', key: 'occupancy' },
        { header: 'Fuel Type', key: 'fueltype' },
        { header: 'Vehicle Ownership', key: 'vehicleownership' }
    ];

    let passengers_data = [];
    passengersDetails.map((el, index) => {
        passengers_data.push(
            {
                "srno": index + 1,
                "surveyorid": el.userid,
                "vechicletype": el.vechicletype,
                "regno": el.regno,
                "originvillage": el.originvillage,
                "origindistrict": el.origindistrict,
                "originstate": el.originstate,
                "destinationvillage": el.destinationvillage,
                "destinationdistrict": el.destinationdistrict,
                "destinationstate": el.destinationstate,
                "triplength": el.triplength,
                "traveltime": el.traveltime,
                "tickettype": el.tickettype,
                "tripfreqency": el.tripfreqency,
                "nooftrips": el.nooftrips,
                "roundtripsameday": el.roundtripsameday,
                "trippurpose": el.trippurpose,
                "occupancy": el.occupancy,
                "fueltype": el.fueltype,
                "vehicleownership": el.vehicleownership,
                "createdat": el.createdat
            }
        )
    });

    passengers_data.forEach((e) => {
        passengers_worksheet.addRow(e);
    });
    goods_data.forEach((e) => {
        goods_worksheet.addRow(e);
    });
    const passenger_buffer = await passengers_workbook.xlsx.writeBuffer();
    const goods_buffer = await goods_workbook.xlsx.writeBuffer();

    let transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });
    const message = {
        from: process.env.MAIL_USER,
        to: "bendreajay007@gmail.com",
        subject: "New Passengers and Goods Report",
        text: "Hello there! \n Here I am attaching excel report for Sales Progress! PFA.",
        html: 'content',
        attachments: [
            {
                filename: od_passengers,
                content: passenger_buffer,
                contentType:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
            {
                filename: od_goods,
                content: goods_buffer,
                contentType:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            }
        ],
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            return false;
        } else {
            return true;
        }
    });

    return true
}


module.exports = {
    sendEmail
}