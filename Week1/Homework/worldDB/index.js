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

const answerQuestions = (question, query) => {
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
  "What are the names of countries with population greater than 8 million?",
  "SELECT name FROM country WHERE population > 8000000"
);

answerQuestions(
  "What are the names of countries that have “land” in their names?",
  "SELECT name FROM country WHERE name LIKE '%land%'"
);

answerQuestions(
  "What are the names of the cities with population in between 500,000 and 1 million?",
  "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000"
);

answerQuestions(
  "What's the name of all the countries on the continent ‘Europe’?",
  "SELECT name FROM country WHERE continent = 'Europe'"
);

answerQuestions(
  "List all the countries in the descending order of their surface areas.",
  "SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC"
);

answerQuestions(
  "What are the names of all the cities in the Netherlands?",
  "SELECT name FROM city WHERE CountryCode = 'NLD'"
);

answerQuestions(
  "What is the population of Rotterdam?",
  "SELECT population FROM city WHERE name = 'Rotterdam'"
);

answerQuestions(
  "What's the top 10 countries by Surface Area?",
  "SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10"
);

answerQuestions(
  "What's the top 10 most populated cities?",
  "SELECT name, population FROM city ORDER BY population DESC LIMIT 10"
);

//not sure if have done this correctly, as population number should be around 7billions and I get 6078749450. So I lost 1bil of humans...
answerQuestions(
  "What is the population number of the world?",
  "SELECT SUM (population) FROM country"
);

connection.end();
