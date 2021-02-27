import mysql from 'mysql';

const connection = mysql.createConnection({
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect();

const listOfQueries = [
  // What are the names of countries with population greater than 8 million?
  'SELECT name FROM country WHERE population > 8000000',
  // What are the names of countries that have “land” in their names?s
  "SELECT name FROM country WHERE name LIKE '%land%'",
  // What are the names of the cities with population in between 500,000 and 1 million?
  'SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000',
  // What's the name of all the countries on the continent ‘Europe’?
  "SELECT name FROM country WHERE continent = 'Europe'",
  // List all the countries in the descending order of their surface areas.
  'SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC',
  // What are the names of all the cities in the Netherlands?
  "SELECT name FROM city WHERE countryCode = 'NLD'",
  // What is the population of Rotterdam?
  "SELECT population FROM city WHERE name = 'Rotterdam'",
  // What's the top 10 countries by Surface Area?
  'SELECT name, surfaceArea From country ORDER BY surfaceArea DESC LIMIT 10',
  // What's the top 10 most populated cities?
  'SELECT name, population From city ORDER BY population DESC LIMIT 10',
  // What is the population number of the world?
  'SELECT SUM(population) From country',
];

const runListOfQueries = arrayOfQueries => {
  arrayOfQueries.forEach(query => {
    connection.query(query, (error, results) => {
      if (error) throw error;
      console.log(results);
    });
  });
};

runListOfQueries(listOfQueries);

connection.end();
