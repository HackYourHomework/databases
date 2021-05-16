const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});

//1-Give an example of a value that can be passed as name and code that would take
// advantage of SQL-injection and (fetch all the records in the database)
//Answer:
//`SELECT Population FROM Country WHERE Name ="" OR ""="" AND Code ="" OR ""=""`.

//2-Rewrite the function so that it is no longer vulnerable to SQL injection

function getPopulation(name, code, cb) {
  connection.query(
    `SELECT Population FROM Country WHERE Name = ? and code = ?`,
    [name, code],
    (err, result) => {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].Population);
    }
  );
}

getPopulation("Syria", "SYR", (err, results) => {
  if (err) throw err;
  console.log(`Population: ${results}`);
});

connection.end();
