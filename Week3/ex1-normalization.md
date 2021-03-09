```
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
```

## What columns violate 1NF?
The columns `food_code` and `food_description` violate atomicity as they contain multiple value. While the columns `member_id`, `member_name`, `member_address`, `dinner_id`, `dinner_date`, `venue_code` and `venue_description` have duplicate records. Moreover, the column `dinner_date` has different types of dates which also violates 1NF.

## What entities do you recognize that could be extracted?
The entities `Members`, `Venues`, `Dinners` and `Foods`could be extracted from the provided table.

## Name all the tables and columns that would make a 3NF compliant solution.
Table `Members` with columns: `member_id INT AUTO_INCREMENT PRIMARY KEY`, `member_name VARCHAR(50)`, `member_address VARCHAR(100)`.

Table `Venues` with columns: `venue_id INT AUTO_INCREMENT PRIMARY KEY`, `venue_name VARCHAR(50)`.

Table `Foods` with columns: `food_id INT AUTO_INCREMENT PRIMARY KEY`, `food_name VARCHAR(50)`.

Table `Dinners` with columns: `dinner_id INT AUTO_INCREMENT PRIMARY KEY`, `dinner_date DATE`, `dinner_venue INT` where this column will be a Foreign Key referenced to the column `venue_id` in the table `Venues`.

Table `Dinner_Attendees_Consumed` will establish the relationship between the entities **Members**, **Dinners** and **Foods** with columns: `dinner_id INT` where this column will be a Foreign Key referenced to the column `dinner_id` in the table `Dinners`, `member_id INT` where this column will be a Foreign Key referenced to the column `member_id` in the table `Members`, `food_id INT` where this column will be a Forign Key referenced to the column `food_id` in the table `Foods`.
