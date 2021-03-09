'use strict';

const mysql = require('mysql');
const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "tarek123321",
  database: 'world',
  multipleStatements: true,
});

// Connect
conn.connect((error) => {
  if (error) {
    throw error;
  }
  console.log('Connected to the database');
});

// Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and (fetch all the records in the database)

/*function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM world.${Country} WHERE Name = '${name}' and code = '${code}'`,
    function(err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].Population);
    }
  );
}
// normal way of using the function
 getPopulation('country' , 'Syria', 'SYR', (err, result) => {
   if (err) {
    console.log(err);
   }
  console.log(`Population: ${result}`);
 });

 // trying to mysql injection would be something like

 getPopulation('country' , "' OR 1=1 OR' , show tables;", "' OR  '", (err, result) => {
  if (err) {
   console.log(err);
  }
 console.log(`Population: ${result}`);
});*/





// Rewrite the function so that it is no longer vulnerable to SQL injection

function getPopulation(name, code, cb) {
  conn.query(
    'SELECT Population FROM country WHERE Name = ? and code = ?',
    [name, code],
    (err, result) => {
      if (err) {
        cb(err);
      }
      if (result.length == 0) {
        cb(new Error('Not found'));
      }
      cb(null, result[0].Population);
    },
  );
}

getPopulation('Syria', 'SYR', (err, results) => {
  if (err) throw err;
  console.log(`Population: ${results}`);
});

// End connection
conn.end();