import { createConnection } from "mysql";
import { readFileSync } from "fs";

//create connection
export const connection = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  // password: "123456",
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
export const createTable = (tableName, tableColumns) => {
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableColumns})`;
  connection.query(sql, (err, results) => {
    checkError(err);
    console.log(`Table ${tableName} is created.`);
  });
};

// function to create table:
export const alterTable = (tableName, alterTableColumns) => {
  const sql = `ALTER TABLE ${tableName} ${alterTableColumns}`;
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

//function to commit or rollback:
export const commitOrRollback = (str) => {
  if (str === `ROLLBACK`) {
    executeQueries([`ROLLBACK`]);
    return;
  }
  executeQueries([`COMMIT`]);
};
