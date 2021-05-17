const { MongoClient } = require('mongodb');

// Replace the following with your Atlas connection string
const url =
  'mongodb+srv://hyf:cYhqu1IT6ASd3xkF@cluster0.phnft.mongodb.net/test?retryWrites=true&w=majority&useUnifiedTopology=true';
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log('Connected correctly to server');
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
