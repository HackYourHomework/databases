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
    let cityDetails = {
      Name: 'Ibb city',
      CountryCode: 'IBB',
      District: 'Ibb state',
      Population: 2000000,
    };

    const city = await col.insertOne(cityDetails);

    // Print to the console
    console.log('document inserted :', city.result.n);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
