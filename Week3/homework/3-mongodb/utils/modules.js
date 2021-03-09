//guides I used for this exercise are found here:
//https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database

const database = "world_db";
const collection = "city";

async function connection(clientConnect) {
  const connectToDB = await clientConnect.db(database).collection(collection);
  return connectToDB;
}

//Create a new record (document) for a new city (your home town, say)
export async function addCity(client, newCity) {
  const db = await connection(client);
  const result = await db.insertOne(newCity);
  console.log(`New city added with the following id: ${result.insertedId}`);
}

//Update that record with a new population
export async function updateRecord(client, cityName, updateInfo) {
  const db = await connection(client);
  const result = await db.updateOne({ city: cityName }, { $set: updateInfo });
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

//I have tried to create an object, that would allow me to enter key and value(findOne({ key: value })), key and value would be placeholder when calling function but was running into errors so had to write two almost identical functions

//Read the document that you just updated in two ways : finding by the city name, and then by the country code

//find by name:
export async function findCityByName(client, cityName) {
  const db = await connection(client);
  const result = await db.findOne({ city: cityName });
  if (result) {
    console.log(
      `Found a listing in the collection with the name '${cityName}':`
    );
    console.log(result);
  } else {
    console.log(`No listings found with the name '${cityName}'`);
  }
}

//find by country code
export async function findByCountryCode(client, code) {
  const db = await connection(client);
  const result = await db.findOne({ countryCode: code });
  if (result) {
    console.log(`Found a listing in the collection with the name '${code}':`);
    console.log(result);
  } else {
    console.log(`No listings found with the name '${code}'`);
  }
}

//Delete the city
export async function deleteCity(client, cityName) {
  const db = await connection(client);
  const result = await db.deleteOne({ name: cityName });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
