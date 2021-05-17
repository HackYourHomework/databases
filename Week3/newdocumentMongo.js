const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  const dbo = db.db("world");
  const myobj = {
    city_id: 4080,
    name: "Almonifya",
    country_code: "EGY",
    district: "Aldelta",
    population: 1000000,
  };
  dbo.collection("city").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
