1. Install tools with this instruction: https://docs.mongodb.com/database-tools/installation/installation-windows/
2. Run this command in Git Bash:
   mongoimport --uri='mongodb+srv://**host**/database'
   --username='**username**' --password='**password**' --collection='**collection**' --type='csv' --fields='**fields with comma separated**' --file='**csvFile**'
   In my case it was:
   'C:/Program Files/MongoDB/Tools/100/bin/mongoimport' --uri='mongodb+srv://cluster0.phnft.mongodb.net/world' --username='hyf' --password='cYhqu1IT6ASd3xkF' --collection='city' --type='csv' --fields='ID,Name,CountryCode,District,Population' --file='C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/city.csv'
