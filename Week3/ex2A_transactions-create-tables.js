const util = require("util");
const fs = require("fs");
const mysql = require("mysql");

const connection_config = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  // database: "userdb",
};

const drop_db = `DROP DATABASE IF EXISTS db_week3`;
const create_db = `CREATE DATABASE db_week3`;
const use_db = `USE db_week3`;

const create_table_account = `CREATE TABLE IF NOT EXISTS account(
  account_number INT AUTO_INCREMENT PRIMARY KEY, 
  balance INT)AUTO_INCREMENT=100`;
const create_table_account_changes = `CREATE TABLE IF NOT EXISTS account_changes(
  change_number INT AUTO_INCREMENT PRIMARY KEY, 
  account_number INT, 
  amount INT, 
  changed_date date, 
  remark VARCHAR(200))`;

async function seedDatabase() {
  const connection = mysql.createConnection(connection_config);
  const readFile = util.promisify(fs.readFile);

  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(drop_db);
    await execQuery(create_db);
    await execQuery(use_db);

    await execQuery(create_table_account);
    await execQuery(create_table_account_changes);

    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

seedDatabase();
