//Import Mongo client
const { MongoClient } = require("mongodb");


async function main() {
  const url ="mongodb+srv://burak:hyfpassword@cluster0.zrzis.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    // Connect to database
    await client.connect();
    console.log("Connected correctly to server");

    // Create a new record (document)
    const cityDocument = {
      Name: "Giresun",
      CountryCode: "TR",
      District: "Turkish",
      Population: 105120,
    };

    await createDocument(client, cityDocument);

    // Update that record with a new population
    const filteredName = "Giresun";
    const updatedRecord = { Population: 731201 };
    await updateDocumentByName(client, filteredName, updatedRecord);
    
    
    // Read the record by city and country code
    const cityName = { Name: "Giresun" };
    const countryCode = { CountryCode: "TR" };
    await Promise.all([readRecord(client, cityName), readRecord(client, countryCode)]);
      
    // Delete the city
    await deleteRecords(client, cityName);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
main().catch(console.error);


async function createDocument(client, newListing) {
 const newDocument = await client.db("world").collection("city").insertOne(newListing);
 console.log(`New listing created with the following id ${newDocument.insertedId}`);
}       
async function updateDocumentByName(client, nameOfRecord, updatedRecord) {
    const updatedPopulation = await client.db('world').collection('city').updateOne( { Name: nameOfRecord ,}, { $set: updatedRecord});
    console.log(`${updatedPopulation.matchedCount} document(s) matched the query criteria.`);
    console.log(`${updatedPopulation.modifiedCount} document(s) was/were updated.`);
}
async function readRecord(client, searchedRecord) {
    const findRecord = await client.db('world').collection('city').findOne(searchedRecord);
    if (findRecord) {
        console.log(`Found a listing in the collection...`);
        console.log(findRecord);
    } else {
        console.log(`No listings found with the name '${searchedRecord}'`);
    }
}
async function deleteRecords(client, deletedRecord) {
    const deleteRecord = await client.db('world').collection('city').deleteOne(deletedRecord);
    if (deleteRecord) {
      console.log(`${deleteRecord.deletedCount} document(s) was/were deleted.`);
    } else {
      console.log(`No listings found with the name '${deletedRecord}'`);
    }
}