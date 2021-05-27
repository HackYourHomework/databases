import util from "util";
import mysql from "mysql";

const CONNECTION_CONFIG = {
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: 'world',
  };

  function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM Country WHERE Name = ? and code = ?`, [name, code],
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }


  // Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and (fetch all the records in the database)
  // send this value insted name: someString or 1=1';'