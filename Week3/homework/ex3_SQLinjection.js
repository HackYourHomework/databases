// Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and (fetch all the records in the database)

// instead of retrieving the required data, this function will retrieve all data in the table
getPopulation("country", "India", "IND OR 1=1", (err, result) => {
  if (err) throw err;
  console.log(result);
});
 
// This function is open to SQL injection
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function(err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}

// I would rewrite the function using prepared statements
// so it is no longer vulnerable to sql injection
function getPopulation(country, name, code) {
  connection.query(
    `SELECT Population FROM country WHERE Name = ? AND code = ?`,
    [name, code],
    function (err, result) {
      if (err) throw err;
      console.log('Data: ', result);
    }
  );
}