import util from "util";
import mysql from "mysql";
import fs from 'fs';
import path from 'path';

const CONNECTION_CONFIG = {
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: 'week3_db',
  };

const DELETE_ACCOUNT_ALL_ROWS = "DELETE FROM account";
const DELETE_ACCOUNT_CHANGES_ALL_ROWS = "DELETE FROM account_changes";

const databaseQueries = async () => {
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));
  
    try {
      await execQuery(DELETE_ACCOUNT_CHANGES_ALL_ROWS);
      await execQuery(DELETE_ACCOUNT_ALL_ROWS);
  
      const accounts = JSON.parse(
        fs.readFileSync(path.resolve("data/account.json"))
      );
  
      const accountsPromises = accounts.map((account) =>
        execQuery("INSERT INTO account SET ?", account)
      );
  
      await Promise.all(accountsPromises);
      
      const accountChanges = JSON.parse(
        fs.readFileSync(path.resolve("data/account-changes.json"))
      );
  
      const accountChangesPromises = accountChanges.map((accountChange) =>
        execQuery("INSERT INTO account_changes SET ?", accountChange)
      );
  
      await Promise.all(accountChangesPromises);
  
    } catch (error) {
      console.log("error: ", error);
    }
  
    connection.end();
  };
  databaseQueries();