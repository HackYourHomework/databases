import {
  connection,
  checkError,
  useDatabase,
  insertTableContent,
  jsonReader,
} from "./initialization.js";

const authors = jsonReader("./data_authors.json");
const research_papers = jsonReader("./data_research_papers.json");
const author_paper = jsonReader("./data_author_paper.json");

//connection
connection.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

useDatabase(`week2_homework`);
insertTableContent(`authors`, authors);
insertTableContent(`research_papers`, research_papers);
insertTableContent(`author_paper`, author_paper);

connection.end((err) => {
  checkError(err);
  console.log(`Mysql disconnected ..`);
});
