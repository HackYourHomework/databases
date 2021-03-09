1- Make an account with Mongodb Atlas.

2- Create a cluster .

3- In Clusters - > Network access tab , Add IP address and let it access to the current IP address.

4- In Clusters - > Database Access tab, Add Database user and password. and wait for it be verified.

5- In the Mysql : use the Database name.

6- In the Mysql, use the following queries:

-for country table

```
SELECT 'Code', 'Name', 'Continent', 'Region', 'SurfaceArea', 'IndepYear', 'Population', 'LifeExpectancy', 'GNP', 'GNPOld', 'LocalName', 'GovernmentForm', 'HeadOfState', 'Capital', 'Code2'
UNION ALL
select * into outfile 'country.csv'
FIELDS TERMINATED BY ';' LINES TERMINATED BY '\n'
from country;

```

-for city table

```
SELECT 'Name', 'CountryCode', 'District', 'Population'
UNION ALL
select Name, CountryCode, District, Population into outfile '\country.csv'
FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'
from country;

```

-for countrylanguage table

```
	SELECT 'CountryCode', 'Language', 'IsOfficial', 'Percentage'
	UNION ALL
	select * into outfile '\countrylanguage.csv'
	FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'
	from countrylanguage;
```

7- Download Mongodb Compass.

8- In Mongodb Atlas, click on connect cluster, then choose connect via Mongodb Compass.

9- Copy the connection string and paste it on Mongodb Compass after connecting to the server through Mongodb Compass.

10- Create collections and name them ( country , city, countrylanguage).

11- Enter each collection and import the data from the specific files we already migrated to csv extension using csv extension.

12- Check the datatype of each field and modify what's necessary. Then click Import.

13- To use mongodb with node.js driver. then go to clusters in Mongodb Atlas and connect with the option of ' Connect your Application ' and use the connection string in your code in javascript files.
