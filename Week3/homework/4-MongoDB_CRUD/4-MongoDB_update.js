const {MongoClient} = require('mongodb');

const url =
  'mongodb+srv://Mo_saif:hyfpassword@cluster0.mp2bo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'world';

async function run() {
  try {
    await client.connect();
    console.log('Connected correctly to server');
    const db = client.db(dbName);

    // Use the collection "people"
    const col = db.collection('city');

    // Construct a document
    var myQuery = {Name: 'Ibb city'};

    let populationUpdate = {
      $set: {
        Population: 3500000,
      },
    };

    const city = await col.updateOne(myQuery, populationUpdate);

    // Print to the console
    console.log('isModified ', city.result.nModified);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
