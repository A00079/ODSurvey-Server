const pool = require('../../db/db.js');

module.exports = {
    create: (data, callBack) => {
        let sql = 'INSERT INTO passengers (id,surveyorid,vechicletype,regno,originvillage,origindistrict,originstate,destinationvillage,destinationdistrict,destinationstate,triplength,traveltime,tickettype,	tripfreqency,nooftrips,roundtripsameday,trippurpose,occupancy,fueltype,vehicleownership,createdat) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        pool.query(sql, ['', data.surveyorid, data.vechicletype, data.regno, data.originvillage, data.origindistrict, data.originstate, data.destinationvillage, data.destinationdistrict, data.destinationstate, data.triplength, data.traveltime, data.tickettype, data.tripfreqency, data.nooftrips, data.roundtripsameday, data.trippurpose, data.occupancy, data.fueltype, data.vehicleownership, data.createdat], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    }
};
