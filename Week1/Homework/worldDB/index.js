const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

//make a connection to the database;
connection.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

const answerQuestions = (query, question) => {
  const sql = query;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    //object which question and answer
    const questionAndAnswer = {
      question,
      answer: result,
    };
    console.log(questionAndAnswer);
  });
};

answerQuestions(
  "SELECT name FROM city WHERE population > 8000000",
  "What are the names of countries with population greater than 8 million?"
);

answerQuestions(
  "SELECT name FROM country WHERE name LIKE '%land%'",
  "What are the names of countries that have “land” in their names?"
);

answerQuestions(
  "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000",
  "What are the names of the cities with population in between 500,000 and 1 million?"
);

answerQuestions(
  "SELECT name FROM country WHERE continent = 'Europe'",
  "What's the name of all the countries on the continent ‘Europe’?"
);

answerQuestions(
  "SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC",
  "List all the countries in the descending order of their surface areas."
);

answerQuestions(
  "SELECT name FROM city WHERE CountryCode = 'NLD'",
  "What are the names of all the cities in the Netherlands?"
);

answerQuestions(
  "SELECT population FROM city WHERE name = 'Rotterdam'",
  "What is the population of Rotterdam?"
);

answerQuestions(
  "SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10",
  "What's the top 10 countries by Surface Area?"
);

answerQuestions(
  "SELECT name, population FROM city ORDER BY population DESC LIMIT 10",
  "What's the top 10 most populated cities?"
);

//not sure if have done this correctly, as population number should be around 7billions and I get 6078749450. So I lost 1bil of humans...
answerQuestions(
  "SELECT SUM (population) FROM country",
  "What is the population number of the world?"
);

connection.end();
