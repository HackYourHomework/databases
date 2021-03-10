Using command provided I keep getting this error:

The MySQL server is running with the --secure-file-priv option so it cannot execute this statement

So instead of using this given command:
select \* into outfile 'city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;

I had to also add my file priv path:
select \* into outfile 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\city.csv'
FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'
from city;

After that I followed steps to create a free cluster for connection with Atlas.
But I was not able to connect my mongoDB to Atlas, if I try to connect via mongo Compass - it shows "loading connection", it doesn`t connect, it doesn`t give any errors. It does absolutly nothing. I searched for solutions which offered me to disconnect my DNS, which I did but it still didn`t help.
Small note: only later I realized that disconnecting DNS sounds weird, but what I meant is disabling my VPN, which has DNS in name of it :))

Eventually I found out that I can`t connect with admin user and had to create new user inside my cluster and then was finally able to connect to compass.

In the notepad++ editor, I have added a new line on top of my newly created CSV, which would act as header to name variables. For example in city.csv I have added this line: id,city,countryCode,province,population
Without doing this, file would be imported into compass with weird headers, as of course sql files do not have them.
