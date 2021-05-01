import { createConnection } from 'mysql';

const connection = createConnection({
  host: `localhost`,
  user: `hyfuser`,
  password: `123hYf!@#`,
  database: `new_world`,
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Mysql server is connected.`);
});

const addQuery = (query) => {
  connection.query(query, (err, results) => {
    if (err) throw err;
    results.forEach((result) => {
      const value = Object.values(result).toString();
      console.log(value);
    });
  });
};

const queriesList = [
  `SELECT name FROM country WHERE population > 8000000`,
  `SELECT name FROM country WHERE name LIKE '%land%'`,
  `SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000`,
  `SELECT name FROM country WHERE continent = 'Europe'`,
  `SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC`,
  `SELECT name FROM city WHERE countryCode = 'NLD'`,
  `SELECT population FROM city WHERE name = 'Rotterdam'`,
  `SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC LIMIT 10`,
  `SELECT name, population FROM city ORDER BY population DESC LIMIT 10`,
  `SELECT SUM(population) FROM country`,
];

queriesList.forEach((query) => addQuery(query));

connection.end();
