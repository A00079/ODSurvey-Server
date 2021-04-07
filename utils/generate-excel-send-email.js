const nodemailer = require('nodemailer')
const config = require('../config/default.json');
const Excel = require('exceljs');

const sendEmail = async () => {
    let od_passengers = 'Passengers.xlsx';
    let od_goods = 'Goods.xlsx';

    let passengers_workbook = new Excel.Workbook();
    let goods_workbook = new Excel.Workbook();

    let passengers_worksheet = passengers_workbook.addWorksheet('Passengers');
    let goods_worksheet = goods_workbook.addWorksheet('Goods');

    passengers_worksheet.columns = [
        { header: 'First Name', key: 'firstName' },
        { header: 'Last Name', key: 'lastName' },
        { header: 'Purchase Price', key: 'purchasePrice' },
        { header: 'Payments Made', key: 'paymentsMade' },
    ];
    goods_worksheet.columns = [
        { header: 'First Name', key: 'firstName' },
        { header: 'Last Name', key: 'lastName' },
        { header: 'Purchase Price', key: 'purchasePrice' },
        { header: 'Payments Made', key: 'paymentsMade' },
    ];
    let passengers_data = [
        {
            firstName: 'John',
            lastName: 'Bailey',
            purchasePrice: 1000,
            paymentsMade: 100,
        },
        {
            firstName: 'Leonard',
            lastName: 'Clark',
            purchasePrice: 1000,
            paymentsMade: 150,
        },
    ];
    let goods_data = [
        {
            firstName: 'Virat',
            lastName: 'Suraj',
            purchasePrice: 69698,
            paymentsMade: 96686,
        },
        {
            firstName: 'Rohan',
            lastName: 'Clark',
            purchasePrice: 7978,
            paymentsMade: 9898,
        },
    ];
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