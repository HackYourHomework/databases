const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to database');
  }
});
function sendQuery(query) {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(`the reply ${query} is `, results);
  });
}
//1. What are the names of countries with population greater than 8 million
const query1 = 'SELECT Name FROM country WHERE Population > 8000000';
sendQuery(query1);

//2. What are the names of countries that have “land” in their names?
const query2 = `SELECT Name FROM country WHERE Name LIKE '%land%'`;
sendQuery(query2);

//3. What are the names of the cities with population in between 500,000 and 1 million?
const query3 =
  'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000';
sendQuery(query3);

//4. What's the name of all the countries on the continent ‘Europe’?
const query4 = `SELECT Name FROM country WHERE Continent = 'Europe'`;
sendQuery(query4);

//5. List all the countries in the descending order of their surface areas.
const query5 = `SELECT Name FROM country ORDER BY SurfaceArea DESC`;
sendQuery(query5);

//6. What are the names of all the cities in the Netherlands?
const query6 = `SELECT Name FROM city WHERE CountryCode = 'NLD'`;
sendQuery(query6);

//7. What is the population of Rotterdam?
const query7 = `SELECT Population FROM city WHERE Name = 'Rotterdam'`;
sendQuery(query7);

//8. What's the top 10 countries by Surface Area?
const query8 = `SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10`;
sendQuery(query8);

//9. What's the top 10 most populated cities?
const query9 = `SELECT Name FROM city ORDER BY Population DESC LIMIT 10`;
sendQuery(query9);

//10. What is the population number of the world?
const query10 = `SELECT SUM(Population) AS worldPopulation FROM country`;
sendQuery(query10);

connection.end((error) => {
  if (error) {
    console.log('error with ending connection ');
  } else console.log('connection is ended');
});
