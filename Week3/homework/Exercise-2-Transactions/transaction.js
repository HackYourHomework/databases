import util from "util";
import mysql from "mysql";

const CONNECTION_CONFIG = {
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: 'week3_db',
  };

const databaseQueries = async () => {
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));
  
    try {
    await execQuery(`SET AUTOCOMMIT = 0`);
    await execQuery(`START TRANSACTION`);
    await execQuery(
      `UPDATE account SET balance = balance -1000 WHERE account_number = 101`
    );
    await execQuery(
      `UPDATE account SET balance = balance +1000 WHERE account_number = 102`
    );
    await execQuery(
      `INSERT INTO account_changes VALUES(4, 101, -1000, now(), "string test4")`
    );
    await execQuery(
      `INSERT INTO account_changes VALUES(5, 102, +1000, now(), "string test5")`
    );
    await execQuery(`COMMIT`);
  
    } catch (error) {
      console.log("error: ", error);
    }
  
    connection.end();
  };
  databaseQueries();