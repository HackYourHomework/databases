"use strict";
//NPM packages
const util = require("util");
const mysql = require("mysql");

//data
const accountData = require("./data/Accounts");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "bank",
  port: 3306,
});

const execQuery = util.promisify(connection.query.bind(connection));

async function insertData() {
  //Account change table
  const accountDataQuery = accountData.map((account) =>
    execQuery(`INSERT INTO account SET ?`, account)
  );

  try {
    await Promise.all(accountDataQuery);
  } catch (error) {
    console.error(error);
  }

  process.exit(0);
}

insertData();
