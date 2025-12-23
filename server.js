/**
 * Recipe Management System - Express Server
 * Main server file for CSC311 Web Applications project
 * Author: Jayden Montez
 * Port: 6080
 */

// Require necessary modules
const express = require('express');
const mysql = require('mysql');
const path = require('path');

// Create Express app
const app = express();
const PORT = 6080;

// Middleware to parse JSON data and serve static files
app.use(express.json());
app.use(express.static('public'));

// Create database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'montezj',
  password: '311JA149',
  database: 'montezj_recipes'
});

// Connect to database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

/**
 * GET endpoint - Fetch all recipes from single table
 */
app.get('/api/recipes', (req, res) => {
  const query = 'SELECT * FROM recipes ORDER BY id DESC';
  
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * GET endpoint - Fetch recipes with categories using JOIN
 * This satisfies the multi-table join requirement
 */
app.get('/api/recipes-with-categories', (req, res) => {
  const query = `
    SELECT r.id, r.name, r.description, r.prep_time, c.name as category
    FROM recipes r
    LEFT JOIN categories c ON r.category_id = c.id
    ORDER BY r.id DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * POST endpoint - Add new recipe to database
 */
app.post('/api/recipes', (req, res) => {
  const { name, description, prep_time, category_id } = req.body;
  const query = 'INSERT INTO recipes (name, description, prep_time, category_id) VALUES (?, ?, ?, ?)';
  
  db.query(query, [name, description, prep_time, category_id], (err, result) => {
    if (err) throw err;
    res.json({ success: true, id: result.insertId });
  });
});

/**
 * PUT endpoint - Update existing recipe
 */
app.put('/api/recipes/:id', (req, res) => {
  const id = req.params.id;
  const { name, description, prep_time, category_id } = req.body;
  const query = 'UPDATE recipes SET name=?, description=?, prep_time=?, category_id=? WHERE id=?';
  
  db.query(query, [name, description, prep_time, category_id, id], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

/**
 * GET endpoint - Fetch all categories
 */
app.get('/api/categories', (req, res) => {
  const query = 'SELECT * FROM categories ORDER BY name';
  
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://augwebapps.com:${PORT}`);
});