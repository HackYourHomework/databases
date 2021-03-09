const util = require('util');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
};

const connection = mysql.createConnection(CONNECTION_CONFIG);
connection.connect();

// Function that open to SQL-injection
function getPopulation(Country, name, code, cb) {
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' AND Code = '${code}'`,
    function(err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
};

// Make SQL-injection and fetch all the records
getPopulation("country", "Belgium", "BEL' OR 1=1 OR '", (error, result) => {
  if(error) console.log(error);
  console.log(result);
});

// Function that eliminates the SQL-injections
function getPopulationWithEscaping(name, code, cb) {
  connection.query(
    `SELECT Population FROM country WHERE Name = ? AND Code = ?`,
    [name, code],
    function(err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
};

// Make SQL-injection and try fetch all the records
getPopulationWithEscaping("Belgium", "BEL' OR 1=1 OR '", (error, result) => {
  if(error) console.log(error);
  console.log(result);
});

// Call the function normally
getPopulationWithEscaping("Belgium", "BEL", (error, result) => {
  if(error) console.log(error);
  console.log(result);
});

connection.end();