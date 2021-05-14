var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'world',
  multipleStatements: true,
});

connection.connect();

function getPopulation(Country, name, code, cb) {
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name = ${connection.escape(
      name,
    )} and code = ${connection.escape(code)}`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) throw new Error('Not found');
      console.log(result);
    },
  );
  connection.end();
}

// getPopulation('Country', 'angola', 'ago');

getPopulation('Country', 'angola', "ago' or 1=1-- ");
