const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    await execQuery(
      "CREATE TABLE IF NOT EXISTS account (account_number int primary key,balance decimal(15,2))"
    );
    await execQuery(
      "CREATE TABLE IF NOT EXISTS account_changes (change_number INT , " +
        "account_number int ,foreign key(account_number) references account(account_number),amount VARCHAR(50)," +
        "changed_date datetime, remark varchar(50))"
    );
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
