DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price FLOAT (20, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Hammer", "tools", 15.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Coffe Mug", "housewares", 4.75, 110);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Ice Cream", "grocery", 3.25, 95);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "electronics", 1200.00, 40);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Silverware set (40pc)", "housewares", 20.50, 37);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Wrench", "tools", 9.00, 75);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Starbucks Medium Roast Whole Bean Coffee", "grocery", 7.50, 64);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("AA Batteries (8ct)", "electronics", 10.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Colgate Toothpaste", "health and beauty", 4.75, 200);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES  ("Dove Shampoo", "health and beauty", 7.25, 142);