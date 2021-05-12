// 1 Create a new record (document) for a new city (your home town, say)

db.createCollection('city');
db.city.insert({ name: 'Baku', state_party: 'Azerbaijan', region: 'Asia' });

// 2 Update that record with a new population

// overwriting syntax
db.city.update(
  { name: 'Baku' },
  {
    name: 'Baku',
    state_party: 'Azerbaijan',
    region: 'Asia',
    countryCode: 'AZE',
    population: 2293100,
  },
);

// modifying syntax
db.city.update(
  { name: 'Baku' },
  {
    $set: {
      countryCode: 'AZE',
      population: 2293100,
    },
  },
);

// 3 Read the document that you just updated in two ways : finding by the city name, and then by the country code

db.city.find({ name: 'Baku' });
db.city.find({ countryCode: 'AZE' });

// 4 Delete the city

db.city.remove({ name: 'Baku' });
