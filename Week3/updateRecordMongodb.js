const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  const dbo = db.db("world");
  const myquery = { city_id: 4080 };
  const newvalues = { $set: { population: 1500000 } };
  dbo.collection("city").updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
