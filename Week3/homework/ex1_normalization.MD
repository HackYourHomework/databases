What columns violate 1NF?
* food_description, because it includes multiple values.
* food_code, it also includes multiple values.

What entities do you recognize that could be extracted?
* member
* food
* venue
* diner

Name all the tables and columns that would make a 3NF compliant solution.
* [member] member_id(pk), member_name, member_address
* [dinner] dinner_id(pk), dinner_date, venue_code(fk), member_id(fk), food_code(fk)
* [venue] venue_code(pk), venue_description
* [food] food_code, food_description

