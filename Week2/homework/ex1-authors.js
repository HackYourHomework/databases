import { createConnection } from 'mysql';
import { promisify } from 'util';

const connectionConfig = {
  host: `localhost`,
  user: `hyfuser`,
  password: `hyfpassword`,
  database: `hyf_db`,
  multipleStatements: true,
};

const connection = createConnection(connectionConfig);

const execQuery = promisify(connection.query.bind(connection));

const fkCheck = (bool) => {
  if (!bool) {
    execQuery(`SET FOREIGN_KEY_CHECKS = 0`);
    return;
  }
  execQuery(`SET FOREIGN_KEY_CHECKS = 1`);
};

const createAuthorsTable = `
  DROP TABLE IF EXISTS authors;
  
  CREATE TABLE authors (
    author_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    author_name VARCHAR(50) NOT NULL,
    university VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    h_index INT NOT NULL,
    gender ENUM ('m', 'f')
    )`;

const alterAuthorsTable = `
  ALTER TABLE authors
    ADD COLUMN mentor INT NOT NULL,
    ADD CONSTRAINT FK_authors
    FOREIGN KEY (mentor)
      REFERENCES authors (author_no)
  `;

try {
  fkCheck(false);

  await execQuery(createAuthorsTable);
  await execQuery(alterAuthorsTable);

  fkCheck(true);
} catch (err) {
  console.error(err.message);
} finally {
  connection.end();
}
