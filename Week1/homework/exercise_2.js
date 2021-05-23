var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// What are the names of countries with population greater than 8 million?
const query1 =
  "SELECT Name FROM country WHERE Population > 8000000";
con.query(query1, (err, result) => {
  if (err) throw err;
  console.log("The names of countries with population greater than 8 million: ", result);
});

// What are the names of countries that have “land” in their names?
const query2 =
  "SELECT Name FROM country WHERE Name LIKE '%land%'";
con.query(query2, (err, result) => {
  if (err) throw err;
  console.log("The names of countries that have “land” in their names: ", result);
});

// What are the names of the cities with population in between 500,000 and 1 million?
const query3 =
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000";
con.query(query3, (err, result) => {
  if (err) throw err;
  console.log("The names of the cities with population in between 500,000 and 1 million: ", result);
});

// What's the name of all the countries on the continent ‘Europe’?
const query4 =
  "SELECT Name FROM country WHERE Continent = 'Europe'";
con.query(query4, (err, result) => {
  if (err) throw err;
  console.log("The name of all the countries on the continent ‘Europe’: ", result);
});

// List all the countries in the descending order of their surface areas.
const query5 =
  "SELECT Name FROM country ORDER BY SurfaceArea DESC";
con.query(query5, (err, result) => {
  if (err) throw err;
  console.log("List all the countries in the descending order of their surface areas: ", result);
});

// What are the names of all the cities in the Netherlands?
const query6 =
  "SELECT Name FROM city WHERE CountryCode = 'NLD' ORDER BY Name";
con.query(query6, (err, result) => {
  if (err) throw err;
  console.log("The names of all the cities in the Netherlands: ", result);
});

// What is the population of Rotterdam?
const query7 =
  "SELECT Population FROM city WHERE Name = 'Rotterdam'";
con.query(query7, (err, result) => {
  if (err) throw err;
  console.log("The population of Rotterdam: ", result);
});

// What's the top 10 countries by Surface Area?
const query8 =
  "SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10";
con.query(query8, (err, result) => {
  if (err) throw err;
  console.log("The top 10 countries by Surface Area: ", result);
});

// What's the top 10 most populated cities?
const query9 =
  "SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10";
con.query(query9, (err, result) => {
  if (err) throw err;
  console.log("The top 10 most populated cities: ", result);
});

// What is the population number of the world?
const query10 =
  "SELECT SUM(Population) AS 'Population of all the world' FROM country";
con.query(query10, (err, result) => {
  if (err) throw err;
  console.log("The population number of the world: ", result);
});

con.end(function (err) {
  if (err) throw err;
  console.log("Disconnected!");
});