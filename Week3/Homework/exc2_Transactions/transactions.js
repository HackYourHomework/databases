const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transactions",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Transaction ...");
});

const errFunc = (err) => {if (err) throw err};

connection.query("USE transactions", errFunc);

const sourceTrans = `UPDATE account SET balance = balance - 1000 WHERE account_number = 101`;
const destinTrans = `UPDATE account SET balance = balance + 1000 WHERE account_number = 102`;

const sourceTransChanges = `INSERT INTO account_changes VALUES(250, 101, -1000, "2021-01-10", "loan")`;
const destinTransChanges = `INSERT INTO account_changes VALUES(251, 102, +1000, "2021-01-10", "loan")`;

async function seedDatabase() {

const execQuery = util.promisify(connection.query.bind(connection));

try {
  await execQuery(`START TRANSACTION`);
  
  await execQuery(sourceTrans);
  await execQuery(destinTrans);
 
  await execQuery(sourceTransChanges);
  await execQuery(destinTransChanges);

  await execQuery("COMMIT");
}

catch (err) {
  console.error(`Something Went Wrong ${err}`);
  await execQuery("ROLLBACK");
}

  connection.end();
}


seedDatabase();