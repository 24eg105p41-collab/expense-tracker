-- Local (non-Docker) development: run once as a MySQL admin user.
CREATE DATABASE IF NOT EXISTS expense_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'expense_user'@'%' IDENTIFIED BY 'change_me_please';
GRANT ALL PRIVILEGES ON expense_tracker.* TO 'expense_user'@'%';
FLUSH PRIVILEGES;
