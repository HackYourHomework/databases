What columns violate 1NF?
* food_description, because it includes multiple values.
* food_code, it also includes multiple values.
* dinner_date, it has different date formats. 

What entities do you recognize that could be extracted?
* member
* food
* venue
* diner

Name all the tables and columns that would make a 3NF compliant solution.
* [member] member_id, member_name, member_address
* [dinner] dinner_id, dinner_date
* [venues] venue_code, venue_description
* [food] food_code, food_description
* [members_dinner] member_id, dinner_id
* [venues_food] venue_code, food_code

