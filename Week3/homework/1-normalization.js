/*
Exercise 1 : Normalization

The manager of the dinner club would like to manage the information system that assists him to keep track of the dinners had by members. 
Because the manager is not an expert of Information Systems, (s)he uses the following table to store the information. 
Please help the manger by using the knowledge of database normal forms. Save all answers in a text file / MD file.

1-) What columns violate 1NF?

    Problems in data are:
         food_code and food_description contain multiple values and 
        dinner_date has different kinds (2020-03-15, 2020/03/15,  Mar 25 '20) although all values in a column must be of the same kind or type.

2-) What entities do you recognize that could be extracted?

    I think it is necessary to extract dinner_id(PK), dinner_date, venue_code(PK), venue_description, food_code and food_description. 
    To make the database comply, we have to split up the table into three smaller tables (Members, Time, Place, Food):
    Table Members : member_id(PK), member_name, member_address. 
    Table Dinner  : dinner_id(PK), dinner_date
    Table Venue   : venue_code(PK), venue_description
    Table Food    : food_code(PK), food_description

3-) Name all the tables and columns that would make a 3NF compliant solution.

    To do 3NF we should also think about the relationship between tables. We can add foreign keys for the tables like that; 
    
    Table Members : member_id(PK), member_name, member_address
    Table Dinner  : dinner_id(PK), dinner_date, member_id(FK), venue_code(FK)     
    Table Venue   : venue_code(PK), venue_description,  food_code(FK)     
    Table Food    : food_code(PK), food_description















*/