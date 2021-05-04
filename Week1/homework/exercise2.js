const util = require('util');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.query(
  'SELECT * FROM city WHERE population > 8000000;',
  ifErrorAndConsole,
);
connection.query(
  'SELECT * FROM city WHERE name LIKE "%land%";',
  ifErrorAndConsole,
);
connection.query(
  'SELECT * FROM city WHERE population BETWEEN  500000 and 1000000;',
  ifErrorAndConsole,
);
connection.query(
  'SELECT * FROM country WHERE continent = "Europe"',
  ifErrorAndConsole,
);
connection.query(
  'SELECT * FROM country ORDER BY SurfaceArea  DESC',
  ifErrorAndConsole,
);
connection.query(
  'SELECT * FROM city WHERE countryCode = "NLD"',
  ifErrorAndConsole,
);
connection.query(
  'SELECT Population FROM city WHERE name = "Rotterdam"',
  ifErrorAndConsole,
);
connection.query(
  'SELECT * FROM country ORDER BY SurfaceArea  DESC LIMIT 10',
  ifErrorAndConsole,
);
connection.query(
  'SELECT * FROM city ORDER BY population  DESC LIMIT 10',
  ifErrorAndConsole,
);

// the last one consoles like "undefined" but works in terminal and Sequel Pro
connection.query('SELECT SUM(`Population`) FROM country', ifErrorAndConsole);

function ifErrorAndConsole(error, result) {
  if (error) throw error;
  result.forEach((element) => {
    if (element.Name) {
      return console.log(element.Name);
    }
    console.log(element.Population);
  });
}

connection.end();
