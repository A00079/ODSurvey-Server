const pool = require('../../db/db.js');

module.exports = {
    deleteData: (data, callBack) => {
        let sql = 'DELETE FROM goods WHERE surveyorid = ?';
        pool.query(sql, [data.surveyorid], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    }
};
