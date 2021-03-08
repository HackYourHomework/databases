/*
The manager of the dinner club would like to manage the information system that assists him to keep track of the dinners had by members. Because the manager is not an expert of Information Systems, (s)he uses the following table to store the information. Please help the manger by using the knowledge of database normal forms. Save all answers in a text file / MD file.
*/

/*
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
*/

// What columns violate 1NF?
/*
The columns that violate 1NF are : 
- member_id => there is a duplicate records and primary key is not applied. 
- member_address => the data is not atomic because we should have only single value in a column. 
- dinner_data => the data are date type but not the same kind, sometimes will not be easy to retrieve data by dinner_date because the format of each record is different and not unique.
- food_code => the data is not atomic and the column has multiple values which even we split them to different tables it will violating 1NF.
- food_description => the data is not atomic and the column has multiple values.
*/

// What entities do you recognize that could be extracted?
/*
I think the entities that could be extracted in my opinion are : 
- venue_description => because we already have venue code. 
- food_description => as well we have the food_code entity.  
*/

// Name all the tables and columns that would make a 3NF compliant solution.
/*
We would make many tables like : 

- Table members => member_id(primary key), member_name, member_house_number, member_street_name.
- Table venues => venue_code(primary key), venue_description. 
- Table foods => food_code(primary key), food_description.
- Table dinners => 
    dinner_id(primary key),
    dinner_date, 
    member_id(foreign key References members.member_id),
    venue_code(foreign key References venues.venue_code),
    food_code(foreign key References foods.food_code).
    (in dinner table we could add many columns and called food1 , food2, food3 ..etc , because we might find it still violating 1NF if we have multiple values in same column. is there any suggestion to solve this ?! )
*/
