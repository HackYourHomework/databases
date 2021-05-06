const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected to database');
});

// To execute select query
function executeQuery(queryString) {
  connection.query(queryString, (err, results) => {
    if (err) throw err;
    console.log(results);
  });
}

// countries with population greater than 8 million
executeQuery('SELECT name FROM country WHERE population > 8000000')
// countries that have “land” in their names
executeQuery("SELECT name FROM country WHERE name LIKE '%land%'");
// cities with population in between 500,000 and 1 million
executeQuery('SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000');
// all the countries on the continent ‘Europe’
executeQuery('SELECT name FROM country WHERE continent = "Europe"');
// countries in the descending order of their surface areas
executeQuery('SELECT name FROM country ORDER BY surfaceArea desc');
// names of all the cities in the Netherlands?
executeQuery('SELECT name FROM city WHERE countryCode = "NLD"');
// population of Rotterdam
executeQuery('SELECT population FROM city WHERE name = "Rotterdam"');
// top 10 countries by Surface Area
executeQuery('SELECT name, surfaceArea FROM country ORDER BY SurfaceArea desc LIMIT 10');
// top 10 most populated cities
executeQuery('SELECT name, population FROM city ORDER BY population desc LIMIT 10');
// population number of the world
executeQuery('SELECT SUM(population) AS populationOfTheWorld FROM country');

connection.end();