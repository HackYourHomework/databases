1. What columns violate 1NF?

food_code, food_description and dinner_date column violate the 1NF rule.

food_code and food_description columns contain multiple values which violate the 1NF rule. Each column should only have single(atomic) values.

dinner_date column should contain same Date() format. It contains different types of data format which violates the 1NF rule.

2. What entities do you recognize that could be extracted?

We need to extract multiple values from food_code and food_description columns, by creating more columns. Each column should contain one value to avoid the violation. (For example food_description1:Curry-food_description2:Cake)

dinner_id(PK), dinner_date, venue_code(PK), venue_description, food_code and food_description should be extracted.

3. Name all the tables and columns that would make a 3NF compliant solution.

To create a 3NF compliant solution we need to create 4 tables:
a. members table
member_id int primary key
member_name varchar(100)
member_address varchar(100)
dinner_id int foreign key references dinner table
venue_code varchar(100) foreign key references venue table
food_code varchar(100) foreign key references food table

b. dinner table
dinner_id int primary key
dinner_date date
venue_code int foreign key

c. venue table
venue_code varchar(50) primary key
venue_description varchar(50)
dinner_id int foreign key

c. food table
food_code varchar(50) primary key
food_description varchar(50)
member_id foreign key
