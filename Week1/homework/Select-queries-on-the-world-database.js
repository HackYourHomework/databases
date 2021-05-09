const mysql = require("mysql");

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "123456",
});

//handle error
const checkError = (error) => {
  if (error) {
    throw error;
  }
};

// function Create a database :
const createDatabase = (dbName) => {
  const sqlCreate = `CREATE DATABASE ${dbName}`;
  db.query(sqlCreate, (err, result) => {
    checkError(err);
    console.log(`${dbName} is created as database.`);
  });
};
// function to use the database:
const useDatabase = (dbName) => {
  const sqlUse = `USE ${dbName}`;
  db.query(sqlUse, (err, result) => {
    checkError(err);
    console.log(`${dbName} is used.`);
  });
};

//Queries (using select statements)
const statements = [
  `The names of countries with population > 8 million:`,
  `The names of countries that have “land” in their names:`,
  `The names of the cities with population in between 500,000 and 1 million:`,
  `The name of all the countries on the continent ‘Europe’:`,
  `The countries in the descending order of their surface areas:`,
  `The names of all the cities in the Netherlands:`,
  `The population of Rotterdam:`,
  `The names of top 10 countries by Surface Area:`,
  `The names of top 10 most populated cities:`,
  `The population number of the world?`,
];
const selectStatements = [
  `SELECT name FROM country WHERE population > 8000000`,
  `SELECT name FROM country WHERE name LIKE '%land%'`,
  `SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000`,
  `SELECT name FROM country WHERE continent = 'Europe'`,
  `SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC`,
  `SELECT name FROM city WHERE countryCode = 'NLD'`,
  `SELECT population FROM city WHERE name = 'Rotterdam'`,
  `SELECT name, surfaceArea From country ORDER BY surfaceArea DESC LIMIT 10`,
  `SELECT name, population From city ORDER BY population DESC LIMIT 10`,
  `SELECT SUM(population) From country`,
];

//function to execute queries:
const executeQueries = () => {
  for (let i = 0; i < selectStatements.length; i++) {
    db.query(selectStatements[i], (err, results) => {
      checkError(err);
      console.log(`${statements[i]}`, results);
    });
  }
};

//connection
db.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

createDatabase(`new_world`);
useDatabase(`new_world`);
executeQueries();

db.end((err) => {
  checkError(err);
  console.log(`Mysql disconnected ..`);
});
