const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});
connection.connect(function (err) {
  if (err) throw err;
  console.log('Node.js connected to MySQl!');
});
// use the = database
connection.query('use world', function (err, result) {
  if (err) throw err;
  console.log('we are in the database');
});
connection.end();
