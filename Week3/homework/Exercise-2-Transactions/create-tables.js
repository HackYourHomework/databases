import util from "util";
import mysql from "mysql";

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
};

const DROP_DATABASE_WEEK3 = "DROP DATABASE IF EXISTS week3_db;";
const CREATE_DATABASE_WEEK3 = "CREATE DATABASE week3_db;";
const USE_DATABASE_WEEK3 = "USE week3_db;";
const CREATE_ACCOUNT_TABLE =
  "CREATE TABLE IF NOT EXISTS account(account_number INT PRIMARY KEY, balance INT)";
const CREATE_ACCOUNT_CHANGES_TABLE = `CREATE TABLE IF NOT EXISTS account_changes(
      change_number INT PRIMARY KEY, 
      account_number INT, 
      amount INT, 
      changed_date DATETIME, 
      remark VARCHAR(50), 
      CONSTRAINT FK_Account_Number FOREIGN KEY (account_number) REFERENCES account(account_number))`;

const databaseQueries = async () => {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(DROP_DATABASE_WEEK3);
    await execQuery(CREATE_DATABASE_WEEK3);
    await execQuery(USE_DATABASE_WEEK3);
    await execQuery(CREATE_ACCOUNT_TABLE);
    await execQuery(CREATE_ACCOUNT_CHANGES_TABLE);

  } catch (error) {
    console.log("error: ", error);
  }

  connection.end();
};
databaseQueries();
