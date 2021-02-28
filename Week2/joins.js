"use strict";

//NPM pacjages
const util = require("util");
const mysql = require("mysql");

//SELECT a.author_name as author, m.author_name as mentor FROM authors m inner join authors a ON a.author_no = m.mentor

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "academy",
  port: 3306,
});

const execQuery = util.promisify(connection.query.bind(connection));
