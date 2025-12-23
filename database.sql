/**
 * Database Setup for Recipe Management System
 * CSC311 Web Applications Project
 * Author: Jayden Montez
 */

-- Create the database
CREATE DATABASE IF NOT EXISTS montezj_recipes;
USE montezj_recipes;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS categories;

/**
 * Categories table - stores recipe categories
 */
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

/**
 * Recipes table - stores recipe information
 * Has foreign key to categories table
 */
CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  prep_time INT,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert sample categories
INSERT INTO categories (name) VALUES
('Dessert'),
('Main Course'),
('Salad'),
('Appetizer');

-- Insert sample recipes
INSERT INTO recipes (name, description, prep_time, category_id) VALUES
('Chocolate Chip Cookies', 'Classic cookies with chocolate chips', 30, 1),
('Spaghetti Carbonara', 'Italian pasta with bacon and eggs', 25, 2),
('Caesar Salad', 'Romaine lettuce with Caesar dressing', 15, 3),
('Chicken Stir Fry', 'Quick stir fry with vegetables', 20, 2),
('Brownies', 'Fudgy chocolate brownies', 40, 1);