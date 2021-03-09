import mongoPKG from "mongodb";
//CRUD functions
import {
  addCity,
  updateRecord,
  findCityByName,
  findByCountryCode,
  deleteCity,
} from "./utils/modules.js";

const { MongoClient } = mongoPKG;

async function main() {
  //connection uri, for connecting to Atlas:
  const uri =
    "mongodb+srv://VaidaDB:c661BbLzb6yWqd4c@testing.6mqzi.mongodb.net/world_db?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("connected");

    // create city
    await addCity(client, {
      city: "Svencionys",
      countryCode: "LTU",
      province: "Vilnius County",
      population: 4065,
    });

    //update city
    await updateRecord(client, "Svencionys", { population: 5098 });

    //find city by country code
    await findByCountryCode(client, "LTU");

    //find city by city name
    await findCityByName(client, "Svencionys");

    //delete city
    await deleteCity(client, "Svencionys");
    //not sure if I did something wrong, but when I try to delete city I get no error, but message says that 0 documents were deleted
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
main();
