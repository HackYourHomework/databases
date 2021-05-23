


1- What columns violate 1NF ?

- food_code, food_description : because these columns have multiple values at the same row.

- dinner_date : because this column has values with different types.



+-----------+---------------+----------------+-----------+-------------+------------+-------------------+

2- What entities do you recognize that could be extracted ?

- member , dinner , venue , food.



+-----------+---------------+----------------+-----------+-------------+------------+-------------------+

3 - Name all the tables and columns that would make a 3NF compliant solution ?

- will make 4 tables :

member_table (member_id (PRIMARY KEY), member_name, member_address)

dinner_table (dinner_id (PRIMARY KEY), member_id (FOREIGN KEY), dinner_date, venue_code (FOREIGN KEY))

food_table   (food_code (PRIMARY KEY), food_description)

venue_table  (venue_code (PRIMARY KEY), venue_description, food_code(FOREIGN KEY))
