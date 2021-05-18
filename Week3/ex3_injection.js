var prompt = require("prompt");
var mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

async function queryDatabase() {
  // let table = "";
  let country = "";
  let country_code = "";

  prompt.start();

  try {
    const selectedCountry = await input(["country"]);
    const countryCode = await input(["country_code"]);

    country = selectedCountry.country;
    country_code = countryCode.country_code;

    // 1. Naive way of passing the parameter to the query
    // const select_query = `SELECT Name, Population FROM country WHERE Name = '${country}' and Code = '${country_code}'`;
    /*I entered the following parameters into the prompt
    country:Turkey
    country_code:t' OR '1'='1 => I entered this line and was able to get the
    population of all the countries in the country table.*/

    // 2. Escaping the parameter ( replacing the unwanted characters)
    const select_query = `SELECT Population FROM country WHERE Name = ${connection.escape(
      country
    )} and code = ${connection.escape(country_code)}`;
    //When I entered "t' OR '1'='1" it escaped and didn't return anything. But it worked fine with the correct country_code
    // 3. Using a question mark syntax to do the escaping
    // const select_query = `SELECT Population FROM country WHERE Name = ? and code = ?`;
    //Here as well when I entered "t' OR '1'='1" it escaped and didn't return anything. But it worked fine with the correct country_code
    connection.connect();
    console.log(select_query);
    const results = await execQuery(select_query, [country, country_code]);
    for (r of results) {
      console.log(JSON.stringify(r));
    }
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queryDatabase();
