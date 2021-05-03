const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});
connection.connect((err) => {
  if (err) {
    console.log('Not connected to database');
    throw err;
  } else {
    console.log('Connected to database');
  }
});
//1. What are the names of countries with population greater than 8 million
const query1 = 'SELECT Name FROM country WHERE Population > 8000000';
connection.query(query1, (error, results, fields) => {
  if (error) {
    console.log('error with query1');
    throw error;
  }
  console.log(`the reply "${query1}" is `, results);
});

//2. What are the names of countries that have “land” in their names?
const query2 = `SELECT Name FROM country WHERE Name LIKE '%land%'`;
connection.query(query2, (error, results, fields) => {
  if (error) {
    console.log('error with query2');
    throw error;
  }
  console.log(`the reply "${query2}" is `, results);
});

//3. What are the names of the cities with population in between 500,000 and 1 million?
const query3 =
  'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000';
connection.query(query3, (error, results, fields) => {
  if (error) {
    console.log('error with query3');
    throw error;
  }
  console.log(`the reply "${query3}" is `, results);
});

//4. What's the name of all the countries on the continent ‘Europe’?
const query4 = `SELECT Name FROM country WHERE Continent = 'Europe'`;
connection.query(query4, (error, results, fields) => {
  if (error) {
    console.log('error with query4');
    throw error;
  }
  console.log(`the reply "${query4}" is `, results);
});

//5. List all the countries in the descending order of their surface areas.
const query5 = `SELECT Name FROM country ORDER BY SurfaceArea DESC`;
connection.query(query5, (error, results, fields) => {
  if (error) {
    console.log('error with query5');
    throw error;
  }
  console.log(`the reply "${query5}" is `, results);
});

//6. What are the names of all the cities in the Netherlands?
const query6 = `SELECT Name FROM city WHERE CountryCode = 'NLD'`;
connection.query(query6, (error, results, fields) => {
  if (error) {
    console.log('error with query6');
    throw error;
  }
  console.log(`the reply "${query6}" is `, results);
});

//7. What is the population of Rotterdam?
const query7 = `SELECT Population FROM city WHERE Name = 'Rotterdam'`;
connection.query(query7, (error, results, fields) => {
  if (error) {
    console.log('error with query7');
    throw error;
  }
  console.log(`the reply "${query7}" is `, results[0]);
});

//8. What's the top 10 countries by Surface Area?
const query8 = `SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10`;
connection.query(query8, (error, results, fields) => {
  if (error) {
    console.log('error with query8');
    throw error;
  }
  console.log(`the reply "${query8}" is `, results);
});

//9. What's the top 10 most populated cities?
const query9 = `SELECT Name FROM city ORDER BY Population DESC LIMIT 10`;
connection.query(query9, (error, results, fields) => {
  if (error) {
    console.log('error with query9');
    throw error;
  }
  console.log(`the reply "${query9}" is `, results);
});

//10. What is the population number of the world?
const query10 = `SELECT SUM(Population) AS worldPopulation FROM country`;
connection.query(query10, (error, results, fields) => {
  if (error) {
    console.log('error with query10');
    throw error;
  }
  console.log(`the reply "${query10}" is `, results[0]);
});

connection.end((error) => {
  if (error) {
    console.log('error with ending connection ');
  } else console.log('connection is ended');
});
