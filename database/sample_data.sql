-- Optional demo data. Dates are relative to today so the dashboard always looks alive.
-- Docker:  docker exec -i expense-mysql sh -c 'mysql -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' < database/sample_data.sql
INSERT INTO expenses (title, amount, category, expense_date, description) VALUES
('Monthly rent',            15000.00, 'HOUSING',       DATE_SUB(CURDATE(), INTERVAL 3 DAY),   'Apartment rent'),
('Grocery shopping',         2350.75, 'FOOD',          DATE_SUB(CURDATE(), INTERVAL 1 DAY),   'Weekly vegetables and staples'),
('Lunch with team',           640.00, 'FOOD',          DATE_SUB(CURDATE(), INTERVAL 2 DAY),   NULL),
('Metro card recharge',       500.00, 'TRANSPORT',     DATE_SUB(CURDATE(), INTERVAL 4 DAY),   NULL),
('Electricity bill',         1820.40, 'UTILITIES',     DATE_SUB(CURDATE(), INTERVAL 6 DAY),   'Monthly bill'),
('Internet',                  999.00, 'UTILITIES',     DATE_SUB(CURDATE(), INTERVAL 7 DAY),   'Broadband plan'),
('Movie tickets',             700.00, 'ENTERTAINMENT', DATE_SUB(CURDATE(), INTERVAL 8 DAY),   'Weekend movie'),
('Gym membership',           1500.00, 'HEALTH',        DATE_SUB(CURDATE(), INTERVAL 10 DAY),  NULL),
('Running shoes',            3499.00, 'SHOPPING',      DATE_SUB(CURDATE(), INTERVAL 12 DAY),  NULL),
('Online course',            2499.00, 'EDUCATION',     DATE_SUB(CURDATE(), INTERVAL 15 DAY),  'Spring Boot course'),
('Fuel',                     1200.00, 'TRANSPORT',     DATE_SUB(CURDATE(), INTERVAL 18 DAY),  NULL),
('Dinner out',                980.00, 'FOOD',          DATE_SUB(CURDATE(), INTERVAL 20 DAY),  NULL),
('Monthly rent',            15000.00, 'HOUSING',       DATE_SUB(CURDATE(), INTERVAL 33 DAY),  'Apartment rent'),
('Grocery shopping',         2100.00, 'FOOD',          DATE_SUB(CURDATE(), INTERVAL 36 DAY),  NULL),
('Weekend trip',             8200.00, 'TRAVEL',        DATE_SUB(CURDATE(), INTERVAL 45 DAY),  'Train + hotel'),
('Doctor visit',              800.00, 'HEALTH',        DATE_SUB(CURDATE(), INTERVAL 50 DAY),  NULL),
('Monthly rent',            15000.00, 'HOUSING',       DATE_SUB(CURDATE(), INTERVAL 63 DAY),  'Apartment rent'),
('Headphones',               2999.00, 'SHOPPING',      DATE_SUB(CURDATE(), INTERVAL 70 DAY),  NULL),
('Electricity bill',         1650.00, 'UTILITIES',     DATE_SUB(CURDATE(), INTERVAL 75 DAY),  NULL),
('Concert',                  2500.00, 'ENTERTAINMENT', DATE_SUB(CURDATE(), INTERVAL 90 DAY),  NULL);
