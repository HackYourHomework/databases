Steps are:

- Create new Atlas account.

- Create new free cluster.

- Connect using Compass.

- Issue the following commands:

  - select \* into outfile 'city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;
  - select \* into outfile 'country.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from country;
  - select \* into outfile 'countrylanguage.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from countrylanguage;

- Create new database name it 'world' and three collections 'city', 'country' and 'countrylanguage'.

- Import tables data and set the right data type.
