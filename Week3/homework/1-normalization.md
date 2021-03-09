QUESTION:
What columns violate 1NF?

ANSWER:
food_code and food_description violate 1NF because they contain multiple values when they can contain only ONE!
And dinner_date violates 1NF as it contains mixed dates, not set in one same date type

QUESTION:
What entities do you recognize that could be extracted?

ANSWER:
We could create 4 tables with unique information from this:
members
dinner
venue
food

QUESTION:
Name all the tables and columns that would make a 3NF compliant solution.

ANSWER:
members table:
member_id INT PRIMARY KEY AUTO_INCREMENT,
member_name VARCHAR(50) NOT NULL,
member_address VARCHAR(255) NOT NULL

dinner table:
dinner_id INT PRIMARY KEY AUTO_INCREMENT,
dinner_date DATE NOT NULL,
member_id INT
venue_code INT
FOREIGN KEY (member_id) REFERENCES members(member_id)
FOREIGN KEY (venue_code) REFERENCES venue(venue_code)

venue table:
venue_code INT PRIMARY KEY AUTO_INCREMENT,
vanue_description VARCHAR(255) NOT NULL

food table:
food_code VARCHAR(2) PRIMARY KEY (not sure actually what type to give, as food code has one letter and one number)
food_description VARCHAR(255) NOT NULL

since during dinner members can order any amount of all kind foods, we can create additional table that hold foreign keys:
order table:
order_id INT PRIMARY KEY AUTO_INCREMENT,
food_code VARCHAR(2)
dinner_id INT
FOREIGN KEY (food_code) REFERENCES food(food_code)
FOREIGN KEY (dinner_id) REFERENCES dinner(dinner_id)
