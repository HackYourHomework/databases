//By this point in the homework and as ilustrated the past week, I lost access to MySQL server trying to troubleshoot a MySQL error for extracting the data. As a result, couldn't complete ex.4 or refactor the code from the previous exercises.
//As of this moment, I got the extracted files from my colleagues and I'm working on finishing this exercise starting the MongoDB part.

const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://hyfuser:hyfpassword@cluster0.rctpa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("World").collection("City");
  console.log(collection);
  client.close();
});
