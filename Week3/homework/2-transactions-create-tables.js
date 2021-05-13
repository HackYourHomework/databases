import {
  connection,
  checkError,
  createDatabase,
  useDatabase,
  createTable,
} from "./initialization.js";
/*
//create table called account with fields:
const accountTableFields = `
      account_number INT PRIMARY KEY,
      balance FLOAT`;
//create table called account_changes  with fields:
const accountChangesTableFields = `
      change_number INT AUTO_INCREMENT PRIMARY KEY,
      account_number INT,
      amount FLOAT,
      changed_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      remark ENUM('IN', 'OUT'),
      FOREIGN KEY(account_number) REFERENCES account(account_number)`;
*/
//connection
connection.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

createDatabase(`week3_homework`);
useDatabase(`week3_homework`);
// createTable(`account`, accountTableFields);
// createTable(`account_changes`, accountChangesTableFields);

// connection.end((err) => {
//   checkError(err);
//   console.log(`Mysql disconnected ..`);
// });
