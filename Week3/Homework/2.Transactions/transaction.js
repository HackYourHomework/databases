"use strict";
//NPM packages
const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "bank",
  port: 3306,
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect();

async function transation() {
  const autoCommit = `SET AUTOCOMMIT = 0`;
  const startTransaction = `start transaction`;
  const transactionFrom = `UPDATE account set balance = balance - 1000 where account_number = 101`;
  const transactionTo = `UPDATE account set balance = balance + 1000 where account_number = 102`;
  const commit = "Commit";

  try {
    await Promise.all[
      (execQuery(autoCommit),
      execQuery(startTransaction),
      execQuery(transactionFrom),
      execQuery(transactionTo),
      execQuery(
        `INSERT INTO account_change (account_number, amount, changed_date, remark )
        VALUES (101, -1000, NOW(), 'House reinnovations'),
        (102, 1000, now(), 'House reinnovations');
        `
      ),
      execQuery(commit))
    ];
  } catch (error) {
    console.error(error);
    await execQuery("Rollback");
  }
  connection.end();
}

transation();
