const express = require("express");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  // host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the 'world' database...");
});

const questionsList = [
  //1  What are the names of countries with population greater than 8 million?
  "SELECT name, population FROM country WHERE population > 8000000",
  //2. What are the names of countries that have “land” in their names?
  "SELECT name FROM country WHERE name LIKE '%land%'",
  //3. What are the names of the cities with population in between 500,000 and 1 million?
  "SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000",
  //4. What's the name of all the countries on the continent ‘Europe’?
  "SELECT name FROM country WHERE continent = 'EUROPE'",
  //5. List all the countries in the descending order of their surface areas.
  "SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC",
  //6. What are the names of all the cities in the Netherlands?
  "SELECT name FROM city WHERE CountryCode = 'NLD'",
  //7. What is the population of Rotterdam?
  "SELECT name, population FROM city WHERE name = 'Rotterdam'",
  //8. What's the top 10 countries by Surface Area?
  "SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC LIMIT 10",
  //9. What's the top 10 most populated cities?
  "SELECT name, population FROM city ORDER BY population DESC LIMIT 10",
  //10. What is the population number of the world?
  "SELECT SUM(population) FROM country",
];

const printAnswers = (arrayOfQuestions) => {
  arrayOfQuestions.forEach((query) => {
    db.query(query, (error, results) => {
      if (error) throw error;
      console.log(results);
    });
  });
};

printAnswers(questionsList);
