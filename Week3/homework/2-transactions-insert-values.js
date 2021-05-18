import {
  connection,
  checkError,
  useDatabase,
  insertTableContent,
  jsonReader,
} from "./initialization.js";

const accountData = jsonReader("./2-transactions-data-account.json");
const accountChangesData = jsonReader(
  "./2-transactions-data-account-changes.json"
);

//connection
connection.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

useDatabase(`week3_homework`);
insertTableContent(`account`, accountData);
insertTableContent(`account_changes`, accountChangesData);

connection.end((err) => {
  checkError(err);
  console.log(`Mysql disconnected ..`);
});
