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
function tableQuery(queryString) {
  connection.query(queryString, (err, results) => {
    if (err) throw err;
    console.log(results);
  });
}

// countries with population greater than 8 million
tableQuery('SELECT name FROM country WHERE population > 8000000;');
// countries that have “land” in their names
tableQuery("SELECT name FROM country WHERE name LIKE '%land%';");
// cities with population in between 500,000 and 1 million
tableQuery('SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000;');
// all the countries on the continent ‘Europe’
tableQuery('SELECT name FROM country WHERE continent = "Europe";');
// countries in the descending order of their surface areas
tableQuery('SELECT name FROM country ORDER BY SurfaceArea desc;');
// names of all the cities in the Netherlands?
tableQuery('SELECT name FROM city WHERE CountryCode = "NLD";');
// population of Rotterdam
tableQuery('SELECT population FROM city WHERE name = "Rotterdam";');
// top 10 countries by Surface Area
tableQuery('SELECT name, surfaceArea FROM country ORDER BY SurfaceArea desc LIMIT 10;');
// top 10 most populated cities
tableQuery('SELECT name, population FROM city ORDER BY population desc LIMIT 10;');
// population number of the world
tableQuery('SELECT SUM(population) AS PopulationOfTheWorld FROM country');

connection.end();