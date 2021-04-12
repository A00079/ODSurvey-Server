const pool = require('../../db/db.js');

module.exports = {
    // fetchPassengersDetails: (data, callBack) => {
    //     let sql = 'SELECT goods.*, surveyors.userid FROM surveyors INNER JOIN goods ON surveyors.id = goods.surveyorid';
    //     pool.query(sql, true, (err, results, fields) => {
    //         if (err) {
    //             return callBack(err);
    //         }
    //         return callBack(null, results);
    //     });
    // },
    fetchPassengersDetails: (data, callBack) => {
        let goodsDetails = null;
        let passengersDetails = null;

        pool.getConnection((err, connection) => {
            connection.beginTransaction((err) => {
                if (err) {
                    throw err;
                }
                let sql =
                    "SELECT goods.*, surveyors.userid FROM surveyors INNER JOIN goods ON surveyors.id = goods.surveyorid";
                connection.query(sql, (err, results) => {
                    if (err) {
                        return connection.rollback((_) => {
                            throw err;
                        });
                    }
                    goodsDetails = results;
                    let getSql =
                        "SELECT passengers.*, surveyors.userid FROM surveyors INNER JOIN passengers ON surveyors.id = passengers.surveyorid";
                    connection.query(getSql, (err, results) => {
                        if (err) {
                            return connection.rollback((_) => {
                                throw err;
                            });
                        }
                        passengersDetails = results;
                        connection.commit((err) => {
                            if (err) {
                                connection.rollback((_) => {
                                    throw err;
                                });
                            }
                            connection.release();
                            callBack(null, goodsDetails, passengersDetails);
                        });
                    });
                });
            });
        });
    },
};
