1. What columns violate 1NF?
   food_code, food_description - contain several values.
   dinner_date - contains values of different types.
2. What entities do you recognize that could be extracted?
   member, dinner, venue, food
3. Name all the tables and columns that would make a 3NF compliant solution.
   table "members" (member_id, member_name, member_address)
   table "venues" ( venue_code, venue_description)
   table "food" (food_code, food_description)
   table "dinners" (dinner_id, dinner_date, member_id, venue_code, food_code)

   For 4NF it would be:
   table "members" (member_id, member_name, member_address)
   table "venues" ( venue_code, venue_description)
   table "food" (food_code, food_description)
   table "dinners" (dinner_id, dinner_date, venue_code)
   table "dinner_member" (dinner_id, member_id)
   table "dinner_food" (dinner_id, food_code)
