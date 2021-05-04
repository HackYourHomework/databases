const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("connected");
});

connection.query("USE world", (error) => {
  if (error) throw error;
});

const queryList = [
  "SELECT name FROM country WHERE population > 8000000",
  "SELECT name FROM country WHERE name LIKE '%land%'",
  "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000",
  "SELECT name FROM country WHERE continent = 'Europe'",
  "SELECT name FROM country ORDER BY surfaceArea DESC",
  "SELECT name FROM city WHERE countryCode = 'NLD'",
  "SELECT population FROM city WHERE name = 'Rotterdam'",
  "SELECT name FROM country ORDER BY surfaceArea DESC LIMIT 10",
  "SELECT name FROM city ORDER BY population DESC LIMIT 10",
  "SELECT SUM(population) FROM country",
];

function answerQuestions(arr) {
  arr.forEach((answer) => {
    connection.query(answer, (error, results) => {
      if (error) throw error;
      results.forEach((result) => {
        for (const [key, value] of Object.entries(result)) {
          console.log(`${key}: ${value}`);
        }
      });
    });
  });
}

answerQuestions(queryList);

connection.end();
