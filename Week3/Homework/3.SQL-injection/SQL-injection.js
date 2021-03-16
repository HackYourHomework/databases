"use strict";

//value passed as name and can take advantage of SQL injection: 'Mars' or 1=1 ; SHOW TABLES
//value passed as code and can take advantage of SQL injection: INJCT or 1=1; DROP DATABASE World

const getPopulation = (Country, name, code, cb) => {
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name =` +
      connection.escape(name) +
      `and code =` +
      connection.escape(code),
    (err, result) => {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
};
