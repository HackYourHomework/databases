const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  const dbo = db.db("world");
  const query = { city_id: 4080, name: "Almonifya" };
  dbo
    .collection("city")
    .find(query)
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  const dbo = db.db("world");
  const query = { city_id: 4080, country_code: "EGY" };
  dbo
    .collection("city")
    .find(query)
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});
