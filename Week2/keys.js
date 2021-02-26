"use strict";

const util = require("util");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  port: 3306,
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const createCurriculumDatabase = `
  CREATE DATABASE IF NOT EXISTS academy`;

  const useDatabase = "use academy";

  const createAuthorsTable = `
  CREATE TABLE IF NOT EXISTS authors (
    author_no INT,
    author_name VARCHAR(50),
    university VARCHAR(100),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('m', 'f'),
    PRIMARY KEY (author_no)
  );`;

  const addMentorColumn = `ALTER TABLE authors
  ADD mentor INT,
  ADD CONSTRAINT FOREIGN KEY(mentor) REFERENCES authors(author_no)`;

  connection.connect();

  try {
    await Promise.all[
      (execQuery(createCurriculumDatabase),
      execQuery(useDatabase),
      execQuery(createAuthorsTable),
      execQuery(addMentorColumn))
    ];
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
