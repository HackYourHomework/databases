const mysql = require("mysql");
const util = require("util");

const accountValues = `
INSERT INTO account VALUES
(101, 1200),
(102, 2150),
(103, 3400)`;

const accountChangesValues = `
INSERT INTO account_changes VALUES
(32, 103, 800, "2021-02-22 10:35:10", "gift"),
(33, 102, 1500, "2021-03-27 11:02:30", "loan"),
(34, 101, 2600, "2021-04-25 08:48:51", "support")
`;

async function seedDatabase() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
  });
  const execQuery = util.promisify(connection.query.bind(connection));
  connection.connect();

  try {
    await execQuery(`USE week3`);
    await execQuery(accountValues);
    await execQuery(accountChangesValues);
    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}
seedDatabase();
