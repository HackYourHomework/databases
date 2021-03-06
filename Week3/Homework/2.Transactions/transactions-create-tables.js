"use strict";
//NPM packages
const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  port: 3306,
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const createBankDatabase = `
  CREATE DATABASE IF NOT EXISTS bank`;

  const useDatabase = "use bank";

  //Account table
  const createAccountTable = `
  CREATE TABLE IF NOT EXISTS account (
    account_number INT(11) NOT NULL,
    balance DECIMAL(10,2),
    CONSTRAINT pk_account PRIMARY KEY (account_number)
  );`;

  //Account change table
  const createAccountChangeTable = `
  CREATE TABLE IF NOT EXISTS account_change (
    change_number INT(11) NOT NULL AUTO_INCREMENT,
    account_number INT(14),
    amount DECIMAL(10,2),
    changed_date DATE,
    remark VARCHAR(100),
    CONSTRAINT pk_change PRIMARY KEY (change_number),
    CONSTRAINT FK_account_number FOREIGN KEY (account_number)
    REFERENCES account(account_number)
  );`;

  connection.connect();

  try {
    await Promise.all[
      (execQuery(createBankDatabase),
      execQuery(useDatabase),
      execQuery(createAccountTable),
      execQuery(createAccountChangeTable))
    ];
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
