const pool = require('../../db/db.js');

module.exports = {
    create: (data, callBack) => {
        let sql = 'INSERT INTO goods (id,surveyorid,vechicletype,regno,originvillage,origindistrict,originstate,destinationvillage,destinationdistrict,destinationstate,triplength,traveltime,dwmy,	nooftrips,commoditytype,weight,vechicleowernship,createdat) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        pool.query(sql, ['', data.surveyorid, data.vechicletype, data.regno, data.originvillage, data.origindistrict, data.originstate, data.destinationvillage, data.destinationdistrict, data.destinationstate, data.triplength, data.traveltime, data.dwmy, data.nooftrips, data.commoditytype, data.weight, data.vechicleowernship, data.createdat], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    }
};
