1. Extract the data (city,country,countrylanguage) from mysql ie the world database, like so;
   * SELECT Name, CountryCode, District, Population into outfile 'C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;
   * Do the same for country and countrylanguage, with their correct headers.

2. Sign up for a MongoDB Atlas account.

3. Create a cluster.

4. Add a database user (set up username/password)

5. Click on the connect button under your cluster name and choose to connect using MongoDB Compass.

6. Download MongoDB Compass then create a new connection in with the string from Atlas that includes the username and password you used to create a user in Atlas

7. In Compass create a database and add 3 collections (city, country, countrylanguage), click on the collection then choose to import data.

8. After uploading all your data, navigate to the collections button under your cluster name in Atlas, to check if the process that everything(data) is as should be.