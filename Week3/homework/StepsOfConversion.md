1. Installed MongoDB Compass
2. Signed up for a MongoDB Atlas account
3. Created a Cluster in the Atlas account
4. Added database user (set up username & password and choosed MongoDB Compass for connection)
5. Created a new connection in Compass with a string from Atlas that includes username and password info
6. Exported tables from mysql world database to desktop path as .csv files with the queries below;
    - For city table: SELECT 'ID', 'Name', 'CountryCode', 'District', 'Population' UNION ALL SELECT * into outfile '~/Desktop/city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' FROM city;
    - For country table: SELECT 'Code', 'Name', 'Continent', 'Region', 'ServiceArea', 'IndepYear', 'Population', 'LifeExpectancy', 'GNP', 'GNPOld', 'LocalName', 'GovernmentForm', 'HeadOfState', 'Capital', 'Code2' UNION ALL SELECT * into outfile '~/Desktop/country.csv' FIELDS  TERMINATED BY ',' LINES TERMINATED BY '\n' FROM country;
    - For countrylanguage table: SELECT 'CountryCode', 'Language', 'IsOfficial', 'Percentage' UNION ALL SELECT * into outfile '~/Desktop/countrylanguage.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' FROM countrylanguage;
7. Created new database in Compass: 'world'
8. Added 3 collections to this database from Compass
9. Imported related .csv file for each collection