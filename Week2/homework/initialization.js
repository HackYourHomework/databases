import { createConnection } from "mysql";
import { readFileSync } from "fs";

//create connection
export const connection = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

//handle error
export const checkError = (error) => {
  if (error) {
    throw error;
  }
};

// function Create a database:
export const createDatabase = (dbName) => {
  const sql = `CREATE DATABASE IF NOT EXISTS ${dbName}`;
  connection.query(sql, (err, results) => {
    checkError(err);
    console.log(`Database ${dbName} is created.`);
  });
};
// function to use the database:
export const useDatabase = (dbName) => {
  const sql = `USE ${dbName}`;
  connection.query(sql, (err, results) => {
    checkError(err);
    console.log(`Database ${dbName} is used.`);
  });
};

// function to create table:
export const createTable = (tableName, tableFields) => {
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableFields})`;
  connection.query(sql, (err, results) => {
    checkError(err);
    console.log(`Table ${tableName} is created.`);
  });
};

// function to create table:
export const alterTable = (tableName, alterTableFields) => {
  const sql = `ALTER TABLE ${tableName} ${alterTableFields}`;
  connection.query(sql, (err, results) => {
    checkError(err);
    console.log(`Table ${tableName} is altered.`);
  });
};

//function to insert content rows depending on table name and chosen columns:
export const insertTableContent = (tableName, content) => {
  content.forEach((row) => {
    const sql = `INSERT INTO ${tableName} SET ?`;
    connection.query(sql, row, (err, results) => {
      checkError(err);
      console.log(`Content is inserted in ${tableName}`);
    });
  });
};

//function to execute queries:
export const executeQueries = (queries) => {
  queries.forEach((query) => {
    connection.query(query, (err, results) => {
      checkError(err);
      console.log(results);
    });
  });
};

//function to read json file:
export const jsonReader = (filePath) => {
  const file = readFileSync(filePath, `utf-8`);
  const array = JSON.parse(file);
  return array;
};
