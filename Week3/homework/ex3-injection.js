const prompt = require("prompt");
const mysql = require("mysql");
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

async function getInfo() {
  let input_table = "";
  let input_city = "";
  let input_city_code = "";

  prompt.start();

  try {
    const result_table = await input(["Enter_table"]);
    const result_country_name = await input(["Enter_country"]);
    const result_country_code = await input(["Enter_countryCode"]);

    input_table = result_table.Enter_table;
    input_country = result_country_name.Enter_country;
    input_country_code = result_country_code.Enter_countryCode;

    // 1. Naive way of passing the parameter to the query
    const select_query = `SELECT Population FROM Country WHERE Name = '${input_country}' and code = '${input_country_code}'`;
    //here inside the prompt I added the parameters
    //Enter_table:country
    //Enter_country: Sanaa
    //Enter_countryCode: 'w' OR '5'='5'
    // and it will run and print the whole population list inside the country table.

    // 2. Escaping the parameter ( replacing the unwanted characters)
    // const select_query=`SELECT Population FROM Country WHERE Name = ${connection.escape(input_country)} and code = ${connection.escape(input_country_code)}`;
    //by using the connection.escape and ran the same prompt for code or country with the injection w' OR '5'='5, didnt work while uing the correct parameter only worked

    // 3. Using a question mark syntax to do the escaping
    // const select_query = `SELECT Population FROM Country WHERE Name = ? and code = ?`;
    // I tried again here using the injection inside code prompt (w' OR '2'='2), it escaped and didnt run the query as well

    connection.connect();

    const results = await execQuery(select_query, [
      input_country,
      input_country_code,
    ]);
    console.log(results);
    for (r of results) {
      console.log(r);
    }
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

getInfo();
