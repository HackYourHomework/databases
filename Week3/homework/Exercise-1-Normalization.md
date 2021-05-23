# Exercise 1 : Normalization

## What columns violate 1NF?

### These fields are not normal

food_code: Multiple values
food_description: Multiple values
dinner_date: Different format

## What entities do you recognize that could be extracted?

- dinner
- venue
- food

## Name all the tables and columns that would make a 3NF compliant solution

### member table

- member_id (PK)
- member_name
- member_address

### venue table

- venue_code (PK)
- venue_description

### food table

- food_code (PK)
- food_description

### dinner table

- dinner_id (PK)
- dinner_date
- member_id (FK)
- venue_code (FK)

### foods dinner table

- id (PK)
- dinner_id (FK)
- food_code (FK)
