
const mysql = require('mysql');


// Make Connection To world DB Using MySQL And hyfuser Login Credentials!
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world',
  port : 3306
});


connection.connect();


var select_query = ["SELECT Name FROM country WHERE Population > 8000000",
                    "SELECT Name FROM country WHERE Name LIKE '%land%'",
                    "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
                    "SELECT Name FROM country WHERE Continent = 'Europe'",
                    "SELECT * FROM country ORDER BY SurfaceArea DESC",
                    "SELECT Name FROM city WHERE CountryCode = 'NLD'",
                    "SELECT Population FROM city WHERE Name = 'Rotterdam'",
                    "SELECT Name From country ORDER BY SurfaceArea DESC LIMIT 10",
                    "SELECT Name From city ORDER BY Population DESC LIMIT 10",
                    "SELECT SUM(Population) From country"
                    ];


function selectQuery(arrayOfQueries){
    arrayOfQueries.forEach(query => {
        connection.query(query, function (error, results, fields) {
            if (error) {
                throw error;
            }
            console.log("the reply is ", results);
        });
    });
}


selectQuery(select_query);

connection.end();
