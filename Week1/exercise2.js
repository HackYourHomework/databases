const fs = require("fs");
const mysql = require("mysql");

// Read the SQL file
const dataSql = fs.readFileSync("./world.sql").toString();

var con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
});
const executeQuery = (query) => {
  con.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};
executeQuery("SELECT Name FROM country WHERE Population > 8000000");
executeQuery(
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000 "
);
executeQuery("SELECT Name FROM country WHERE continent= 'Europe'");
executeQuery("SELECT Name FROM country ORDER BY SurfaceArea DESC ");
executeQuery(
  "SELECt city.Name FROM city INNER JOIN country on city.CountryCode=country.Code " +
    "AND country.Name='Netherlands'"
);
executeQuery("SELECT Population FROM city WHERE Name='Rotterdam'");
executeQuery("SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10 ");
executeQuery("SELECT Name FROM city ORDER BY Population DESC LIMIT 10 ");
executeQuery("SELECT SUM(Population) FROM Country");

con.end();
