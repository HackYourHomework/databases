"use strict";

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  port: 3306,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//I used CLI to restore the data dump since I tried restoring it using a query with no luck.

query("USE world", "world DB selected");

//1.query for countries with population over 8 Mil
const countriesPopulationQuer =
  "SELECT name FROM country WHERE Population > 8000000 ";
query(
  countriesPopulationQuer,
  "Country names with population above 8 million are"
);

//2.query for countries with "land" in the name
const countriesLandQuer = `SELECT name FROM country WHERE name LIKE "%land"`;
query(countriesLandQuer, `Country with "Land" in their names are`);

//3.querry for cities with population between 500000 and 1000000
const cityPopulationQuer =
  "SELECT name FROM city WHERE population >= 500000 AND population <= 1000000";
query(
  cityPopulationQuer,
  `Cities with population between 500000 and 1000000 are`
);

//4.querry for countries in Europe
const countriesInEuropeQuer = `SELECT Name FROM country WHERE Continent = "europe"`;
query(countriesInEuropeQuer, `Countries in Europe are`);

//5.querry for countries in descending order based on surface area
const countriesSurAreaDesc =
  "SELECT name, SurfaceArea from Country ORDER BY SurfaceArea DESC";
query(
  countriesSurAreaDesc,
  `Countries by surface area in descending order are`
);

//6.querry to return cities in NLD
const CitiesInNldQuer = `SELECT name FROM city WHERE CountryCode = 'NLD'`;
query(CitiesInNldQuer, "Cities with country code NLD are");

//7.querry for Population of Rotterdam
const rotterdamPopulationQuer = `SELECT Population FROM city WHERE Name = 'Rotterdam'`;
query(rotterdamPopulationQuer, "Population of Rotterdam is");

//8.querry for top 10 countries by surface area
const top10SurAreaQuer = `SELECT name, SurfaceArea from Country ORDER BY SurfaceArea DESC LIMIT 10`;
query(top10SurAreaQuer, "Top 10 countries based on surface area are");

//9.querry for top 10 populated cities
const top10populatedCitQuer = `SELECT name,population FROM city ORDER BY population DESC LIMIT 10`;
query(top10populatedCitQuer, "Top 10 cities based on population are");

//10.querry for sum of world population
const worldPopulationSumQuer = `SELECT SUM(population) AS PopulationOfTheWorld FROM country`;
query(worldPopulationSumQuer, "Sum of world population is");

//reusuable funtion to perform query
function query(quer, querMsg) {
  connection.query(quer, (error, results) => {
    if (error) throw error;
    console.log(`${querMsg}:`);
    console.log(results);
  });
}

connection.end();
