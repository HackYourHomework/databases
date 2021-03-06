"use strict";
//NPM packages
const util = require("util");
const mysql = require("mysql");

//data
const accountData = require("./data/Accounts");
const accountChanges = require("./data/accountChanges");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "bank",
  port: 3306,
});

connection.connect();

const execQuery = util.promisify(connection.query.bind(connection));

async function insertData() {
  //Account data table
  const accountDataQuery = accountData.map((account) =>
    execQuery(`INSERT IGNORE INTO account SET ?`, account)
  );
  //Account change table
  const accountChangesQuery = accountChanges.map((change) =>
    execQuery(`INSERT IGNORE INTO account_change SET ?`, change)
  );

  try {
    await Promise.all[(accountDataQuery, accountChangesQuery)];
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

insertData();
