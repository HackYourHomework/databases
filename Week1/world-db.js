var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  port: 3306,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//creating the DB
query("CREATE DATABASE IF NOT EXISTS world", "World DB created!");

query("USE world", "world DB selected");

//I used CLI to restore the data dump since I tried restoring it using a query with no luck.

///Users/ahmad/Documents/HYF/Homework/databases/Week1/world.sql

//query for countries with population over 8 Mil
countriesPopulationQuer =
  "SELECT name FROM country WHERE Population > 8000000 ";

query(
  countriesPopulationQuer,
  "Country name with population > 8 million returned"
);

//query for countries with "land" in the name
countriesLandQuer = `SELECT name FROM country WHERE name LIKE "%land"`;

query(
  countriesLandQuer,
  `Country with "Land" in their name with population > 8 million returned`
);

//querry for cities with population between 500000 and 1000000
cityPopulationQuer =
  "SELECT name FROM city WHERE population >= 500000 AND population <= 1000000";
query(
  cityPopulationQuer,
  `Cities with population between 500000 and 1000000 returned`
);

//querry for countries in Europe
countriesInEuropeQuer = `SELECT Name FROM country WHERE Continent = "europe"`;
query(countriesInEuropeQuer, `Countries in Europe returned`);

//querry for countries in descending order based on surface area
countriesSurAreaDesc =
  "SELECT name, SurfaceArea from Country ORDER BY SurfaceArea DESC";
query(
  countriesSurAreaDesc,
  `Countries by surface area in descending order returned`
);

//reusuable funtion to perform query
function query(quer, querMsg) {
  connection.query(quer, (error, results, fields) => {
    if (error) throw error;
    console.log(querMsg);
    console.log(results);
  });
}

connection.end();
