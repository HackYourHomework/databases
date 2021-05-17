const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});
conn.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected');
  }
});
function getPopulation(Country, name, code, cb) {
  conn.query(
    `SELECT Population FROM ${Country} 
    WHERE Name = ? AND code2 = ?`,
    [name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(result);
    },
  );
}
getPopulation('Country', `Aruba ' OR '1'='1`, `AW ' OR '1'='1`, console.log);

conn.end((error) => {
  if (error) {
    console.log('error with ending connection');
  } else console.log('connection is ended');
});
