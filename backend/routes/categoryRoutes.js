const express = require('express');
const db = require('../db'); // Ensure `db` is your database connection module
const router = express.Router();
const multer = require('multer');
const path = require('path');


// Get all categories
router.get('/categories', (req, res) => {
    const query = 'SELECT * FROM categories';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).send({ error: 'Failed to fetch categories' });
        }
        res.json(results);
    });
});


// Add a new category
router.post('/categories', (req, res) => {
    const { pname, status, categoryid, category } = req.body;
  
  
    const query = 'INSERT INTO categories (name, status, category_id, category) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
    db.query(query, [pname, status, categoryid, category], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to add category' });
        }
        res.status(201).json({ message: 'Category added successfully' /*, itemId: results.insertId */ });
    });
});


// Update a category
router.put('/categories/:id', (req, res) => {
    // const itemId = req.params.id;
    const id = req.params.id;
    const { pname, status, categoryid, category } = req.body;
    
  
    const query = 'UPDATE categories SET name = ?, status = ?, category_id = ?, category = ? WHERE id = ?';
  
    db.query(query, [pname, status, categoryid, category, id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to update category' });
        }
        res.json({ message: 'Category updated successfully' });
    });
});


// Delete a category
router.delete('/categories/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM categories WHERE id = ?';
  
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to delete category' });
        }
        res.json({ message: 'Category deleted successfully' });
    });
});


module.exports = router;