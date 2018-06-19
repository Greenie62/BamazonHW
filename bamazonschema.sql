CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(75) NOT NULL,
department_name VARCHAR(75),
price DECIMAL NOT NULL,
stock_quantity SMALLINT);

