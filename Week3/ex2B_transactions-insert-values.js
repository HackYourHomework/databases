const util = require("util");
const fs = require("fs");
const mysql = require("mysql");

const connection_config = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "db_week3",
};

async function seedDatabase() {
  const connection = mysql.createConnection(connection_config);
  const readFile = util.promisify(fs.readFile);

  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    const data1 = await readFile(__dirname + "/account.json", "utf8");
    const data2 = await readFile(__dirname + "/account_changes.json", "utf8");

    const theAccounts = JSON.parse(data1);
    const theAccountChanges = JSON.parse(data2);

    execQuery("SET FOREIGN_KEY_CHECKS=0");

    const promise1 = theAccounts.map((account) =>
      execQuery("INSERT INTO account SET ?", account)
    );

    execQuery("SET FOREIGN_KEY_CHECKS=0");

    const promise2 = theAccountChanges.map((change) =>
      execQuery("INSERT INTO account_changes SET ?", change)
    );

    await Promise.all(promise1);
    await Promise.all(promise2);

    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

seedDatabase();
