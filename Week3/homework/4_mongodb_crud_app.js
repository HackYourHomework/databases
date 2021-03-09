const MongoClient = require('mongodb').MongoClient;

// The variable 'url' requires to set for username and password
// const url = "mongodb+srv://<username>:<password>@cluster0.pk3zc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Function for creating new record
async function createNewRecord() {
	const client = new MongoClient(url, { useUnifiedTopology: true });

	try {
		await client.connect();
	
        const myCity = {
            ID : "4080",
            Name: "My New City",
            CountryCode: "NewCity",
            District: "My Province",
            Population: "6000000"
        };

		await client.db("world").collection("city").insertOne(myCity);
	} catch(error) {
		console.error(error);
	} finally {
		await client.close();
	};
};

// Function for updating the record
async function updateNewRecord() {
	const client = new MongoClient(url, { useUnifiedTopology: true });

	try {
		await client.connect();

		await client.db("world").collection("city").updateOne(
            {Name : "My New City"}, {$set: {Population: 100000}}
        );
	} catch(error) {
		console.error(error);
	} finally {
		await client.close();
	};
};

// Function for finding the record by city name and country code
async function findNewRecord() {
	const client = new MongoClient(url, { useUnifiedTopology: true });

	try {
		await client.connect();

		await client.db("world").collection("city").find({Name: "My New City"});
		
        await client.db("world").collection("city").find({CountryCode: "NewCity"});
	} catch(error) {
		console.error(error);
	} finally {
		await client.close();
	};
};

// Function for deleting the record
async function deleteNewRecord() {
	const client = new MongoClient(url, { useUnifiedTopology: true });

	try {
		await client.connect();

		await client.db("world").collection("city").deleteOne({Name: "My New City"});
	} catch(error) {
		console.error(error);
	} finally {
		await client.close();
	};
};

createNewRecord();
// updateNewRecord();
// findNewRecord();
// deleteNewRecord();