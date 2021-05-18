1-What columns violate 1NF?
the column dinner_date because the data is not the same domain
the columns food_code and food_description because it should only have single(atomic) valued attributes/columns.

2-What entities do you recognize that could be extracted?
. member_address column has to be extracted into two columns, as member_houseNumber1 type: int and member_street_name(type: varchar)

. food_code column and food_description column extract the multiple values by creating more columns each column contains one value to avoid the violation.

. dinner_date move into different table e.g dinner table because its a nono-prime attribute that functionally dependent on a proper subset of a candidate
key

. venue_description move into different table e.g venue table because its a nono-prime attribute that functionally dependent an a proper subset of a candidate
key

. food_description move into different table e.g food table because its a nona-prime attribute that functionally dependent on a proper subset of a candidate
key

3-Name all the tables and columns that would make a 3NF compliant solution.
members table holds columns member_id , member_name and member address_no .
dinner table holds columns dinner_id , dinner_date.
venue table holds columns venue_code, venue_description.
food table holds columns food_code , food_description.
