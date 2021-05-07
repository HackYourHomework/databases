const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});
connection.connect((err) => {if (err)throw err;});

connection.query("USE world", (error) => {
    if (error) throw error;
});

const queryFunc = (err,result)=>{
    if (err) throw err;
    console.log(result);
}

connection.query('SELECT Name FROM country WHERE Population > 8000000',queryFunc);

connection.query("SELECT name FROM country WHERE name LIKE '%land%'",queryFunc);

connection.query('SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000',queryFunc);

connection.query('SELECT name FROM country WHERE continent = "Europe"',queryFunc);

connection.query('SELECT name FROM country ORDER BY SurfaceArea DESC',queryFunc);

connection.query('SELECT name FROM city WHERE CountryCode = "NLD"',queryFunc);

connection.query('SELECT population FROM city WHERE name = "Rotterdam"',queryFunc);

connection.query('SELECT name FROM country ORDER BY SurfaceArea DESC LIMIT 10',queryFunc);

connection.query('SELECT name FROM city ORDER BY population DESC LIMIT 10',queryFunc);

connection.query('SELECT SUM(population) AS WorldPopulation FROM country',queryFunc);

connection.end();