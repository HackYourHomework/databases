//Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and (fetch all the records in the database)
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}

//example:
getPopulation("country", "Lithuania", "LTU OR 1=1", (err, result) => {
  if (err) {
    throw err;
  }
  console.log(result);
});

//Rewrite the function so that it is no longer vulnerable to SQL injection
function getPopulationFixed(Country, name, code, cb) {
  //adding placeholders
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = ? and code = ?`,
    [name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
