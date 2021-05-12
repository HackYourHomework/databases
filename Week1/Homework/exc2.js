const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect((err) => {if (err)throw err;});

connection.query("USE world", (error) => {
    if (error) throw error;
});

const execQuery = (queries) => {
  queries.forEach((query) => {
    connection.query(query, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  });
}

const queriesList = [
  'SELECT Name FROM country WHERE Population > 8000000',
  'SELECT name FROM country WHERE name LIKE "%land%"',
  'SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000',
  'SELECT name FROM country WHERE continent = "Europe"',
  'SELECT name FROM country ORDER BY SurfaceArea DESC',
  'SELECT name FROM city WHERE CountryCode = "NLD"',
  'SELECT population FROM city WHERE name = "Rotterdam"',
  'SELECT name FROM country ORDER BY SurfaceArea DESC LIMIT 10',
  'SELECT name FROM city ORDER BY population DESC LIMIT 10',
  'SELECT SUM(population) AS WorldPopulation FROM country',
  ];


execQuery(queriesList);

connection.end();