Q1: What columns violate 1NF?

- 'food_code' & 'food_description' (multiple values).
- 'dinner_date' (multiple date formats).

<br>
Q2: What entities do you recognize that could be extracted?

- members_table.
- dinners_table.
- locations_table.
- foods_table.

<br>
Q3: Name all the tables and columns that would make a 3NF compliant solution.

- members_table:<br>
  member_id INT AUTO_INCREMENT PRIMARY KEY,<br>
  member_name VARCHAR(50) NOT NULL,<br>
  member_address VARCHAR(255) NOT NULL;

- dinners_table:<br>
  dinner_id INT AUTO_INCREMENT PRIMARY KEY,<br>
  dinner_date DATE NOT NULL,<br>
  member_id INT FOREIGN KEY (member_id) REFERENCES members(member_id),<br>
  venue_code INT FOREIGN KEY (venue_code) REFERENCES venue(venue_code);

- locations_table:<br>
  venue_code INT AUTO_INCREMENT PRIMARY KEY,<br>
  vanue_description VARCHAR(50) NOT NULL;

- foods_table:<br>
  food_code VARCHAR(2),<br>
  food_description VARCHAR(255) NOT NULL;
