const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});

function getPopulation(Country, name, code, cb) {
  connection.connect();
  // assuming that connection to the database is established and stored as conn
  connection.query(
    `SELECT Population FROM ` +
      connection.escape(Country) +
      ` WHERE Name = ` +
      connection.escape(name) +
      " and code = " +
      connection.escape(code),
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      return cb(null, result[0].name);
    }
  );
  connection.end();
}

getPopulation("country", "Aruba", "ABW' OR '1'='1", function (err, result) {
  if (err) throw err;
  console.log(result);
});
