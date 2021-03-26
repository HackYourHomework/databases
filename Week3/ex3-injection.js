// Old function without SQL-injection proofing
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
// Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and (fetch all the records in the database)
// Answer: The value of name could be `'whatever' OR 1=1` and the value of code could be `'whatever' OR 1=1; SHOW TABLES; '` and it would retrieve all tables from database and any other SQL injection could have been done.


// Rewrite the function so that it is no longer vulnerable to SQL injection
// Answer: New function with SQL-injection proofing and ASYNC/AWAIT
async function getPopulation(table, name, code, cb) {
  try {
    name = conn.escape(name);
    code = conn.escape(code);
    const result = await execQuery(
      `SELECT Population FROM ${table} WHERE Name = ? and code = ?`, [name, code]
    );
    cb(`Population of ${name}:`, result[0].Population);
  } catch (error) {
    cb(new Error("Not found", error));
  }
}
