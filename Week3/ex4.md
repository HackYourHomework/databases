Go to <https://www.mongo.db.com>
Download MongoDB Community Server
Click to download
The setup wizard will install MongoDB 4.4.6 2008R 2Plus SSL (64bit)(Windows) on your computer.
MongoDB Compass is also downloaded.
Go to mongodb.com/cloud/atlas and sign up (create an account).
After logging in build a cluster.
You need to choose a provider (AWS) and chose your region.
You need to choose Cluster Tier (NO Sandbox-Free Forever)
You can rename your cluster (TestCluster1 in my case)
Click create cluster.
Then you need to create your first database user
Go to Database Access
Add new user
Enter username
Password
Select read and write to any database.
Then you need to add IP Address to your Access List (Whitelist your IP Address)
Go to Network Access
Add IP Address
There are two options.
Add Current IP Address
Allow access from anywhere(Choose this-less secure though)
Then go to Clusters.
Click Connect
Connect Using MongoDB Compass
Choose I have MongoDB Compass
Copy the connection string, then open MongoDB Compass.
(mongodb+srv://<username>:<password>@testcluster1.reakx.mongodb.net/test)
Click edit to modify your connection string (SRV or Standard )
Paste the string. Make sure you entered your user name and password (for the selected user)
Click Connect
Now we successfully created the connection between our local application (MongoDB Compass) and remote database (MongoDB Atlas)
Now our task is to migrate the world database from Mysql to MongoDB
Create ‘world’ database. Add three collections ‘city’, ‘country’, ‘countrylanguage’.
Go to MySQL 8.0 Command Line Client
Select databases;
Switch to ‘world’ database (use world;)
Copy the first query from Databases/Week3/MAKEME.md
(select \* into outfile 'city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;)
This will give an error:
(The MySQL Server is running with the –secure-file-priv option so it cannot execute this statement)
When you google you will find the below solution to Error 1290; write this query:
SHOW VARIABLES LIKE "secure_file_priv";
+---------------------------------------------+
| Variable_name |Value |
+-----------------------+-------------------------------------------+
| secure_file_priv | C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\ |
+-----------------------+-------------------------------------------+

Copy this value and insert it to the first query before city.csv
(select \* into outfile ' C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;)(Make sure to replace the backslash with slash)
Go to ‘C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/city.csv' (This may be different for everyone. Go to the ‘value’). There you will see the ‘city.csv’ file.
When you open this file you will see that there are no column/field names.
Go to MySQL 8.0 Command Line Client and write ‘describe city’, take the column names from here, add a row onto the top of city.csv file and insert the column names manually into the city.csv file. Save your file. Make sure it is in .csv format.

Now go the MongoDB Compass. Select collection ‘city’ from ‘word’ database.

Press 'Import data' then browse and go to ‘value’ (C:/ProgramData/MySQL/MySQL Server 8.0/Uploads in my case )to find the 'city.csv' file.
Now you can determine the types of each column, string, number etc.
Press 'Import'
Now go to your MongoDB Atlas account
Choose database ‘world’ and collection ‘city’
You will see that the city table is migrated to the MongoDB Atlas.
The same steps should be repeated for the ‘country’ and ‘countrylanguage’ tables.
