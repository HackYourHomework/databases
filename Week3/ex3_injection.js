var prompt = require("prompt");
var mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});

//1. Give an example of a value that can be passed as `name` and `code` that would take advantage of SQL-injection and
// (fetch all the records in the database)
//`SELECT * FROM Country WHERE Name ="" or ""="" OR code ="" OR ""="" LIMIT 5`;

function getPopulation(name, code, cb) {
  connection.query(
    `SELECT Population FROM Country WHERE Name = ? and code = ?`,
    [name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].Population);
    }
  );
}

getPopulation("Turkey", "TUR", (err, results) => {
  if (err) throw err;
  console.log("Population of Turkey:" + `${results}`);
});
connection.end();
