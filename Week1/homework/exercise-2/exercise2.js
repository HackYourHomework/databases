const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'new_world'
});
 
connection.connect();

connection.query('USE new_world');

// 1.The names of countries with population greater than 8 million
connection.query("SELECT Name FROM country WHERE population > 8e6", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

// 2.The names of countries that have “land” in their names
connection.query("SELECT Name FROM country WHERE Name LIKE '%land%'", (error, results, fields) => {
    if (error) throw error;
    console.log(results);
});

// 3.The names of the cities with population in between 500,000 and 1 million
connection.query("SELECT Name FROM city WHERE Population BETWEEN 5e5 AND 1e6", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

// 4.The names of all the countries on the continent ‘Europe’
connection.query("SELECT Name FROM country WHERE Continent = 'Europe'", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

// 5.All the countries in the descending order of their surface areas
connection.query("SELECT * FROM country ORDER BY SurfaceArea DESC", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

// 6.The names of all the cities in the Netherlands
connection.query("SELECT Name FROM city WHERE CountryCode = 'NLD'", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

// 7.The population of Rotterdam
connection.query("SELECT Population FROM city WHERE Name = 'Rotterdam'", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

// 8.The top 10 countries by Surface Area
connection.query("SELECT * FROM country ORDER BY SurfaceArea DESC LIMIT 10", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

// 9.The top 10 most populated cities
connection.query("SELECT * FROM city ORDER BY Population DESC LIMIT 10", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

// 10.The population number of the world
connection.query("SELECT SUM(Population) AS TotalWorldPopulation FROM country", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});
 
connection.end();