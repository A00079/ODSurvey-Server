const mysql = require("mysql");

var pool = mysql.createPool({
  multipleStatements: true,
  host: "103.102.234.200",
  user: "lggfesav_odsurvey",
  password: "odsurvey123",
  database: "lggfesav_odsurvey",
  port: 3306,
});

pool.getConnection((err) => {
  if (err) {
    console.log("Error Connecting to DB.", err);
  } else {
    console.log("Successfully Connected to DB.");
  }
});

module.exports = pool;
