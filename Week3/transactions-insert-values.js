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
    /* await execQuery(
      "INSERT INTO account (account_number,balance) VALUES (101,3000),(102,4000)"
    );*/
    await execQuery(
      "INSERT INTO account_changes (change_number,account_number,amount,changed_date,remark) VALUES" +
        "(1,101,500,'2021-09-03','U received amount of money')" +
        ",(2,102,600,'2021-09-03','U received amount of money')"
    );
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
