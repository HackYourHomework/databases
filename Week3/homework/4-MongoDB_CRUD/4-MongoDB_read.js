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

    let myQueryCityName = {Name: 'Ibb city'};
    let myQueryCountryCode = {CountryCode: 'IBB'};

    const cityName = await col.findOne(myQueryCityName);
    const countryCode = await col.findOne(myQueryCountryCode);

    // Print to the console
    console.log('Data requested using city Name : ', cityName);
    console.log('Data requested using country Code : ', countryCode);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
