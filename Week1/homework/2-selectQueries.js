const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});
connection.connect(function (err) {
  if (err) throw err;
  console.log('Node.js connected to MySQl!');
});

// function to send SELECT query
function sqlQuery(queryString) {
  connection.query(queryString, function (err, result) {
    if (err) throw err;
    console.log('The requested data are ', result);
  });
}
// What are the names of countries with population greater than 8 million?
sqlQuery('SELECT name FROM country WHERE population > 8000000');

// What are the names of countries that have “land” in their names?
sqlQuery("SELECT name FROM country WHERE name LIKE '%land%'");

// What are the names of the cities with population in between 500,000 and 1 million?
sqlQuery('SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000');

// What's the name of all the countries on the continent ‘Europe’?
sqlQuery("SELECT name FROM country WHERE continent = 'europe'");

// List all the countries in the descending order of their surface areas.
sqlQuery('SELECT name FROM country ORDER BY country.surfaceArea DESC');

// What are the names of all the cities in the Netherlands?
sqlQuery("SELECT name FROM city WHERE countrycode = 'NLD'");

// What is the population of Rotterdam?
sqlQuery("SELECT population FROM city WHERE name = 'Rotterdam'");

// What's the top 10 countries by Surface Area?
sqlQuery('SELECT name FROM country ORDER BY country.surfaceArea DESC LIMIT 10');

// What's the top 10 most populated cities?
sqlQuery('SELECT name FROM city ORDER BY city.population DESC LIMIT 10');

// What is the population number of the world?
sqlQuery('SELECT SUM(population) AS world_population FROM country');

connection.end();
