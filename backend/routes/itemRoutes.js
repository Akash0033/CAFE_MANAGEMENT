const express = require('express');
const db = require('../db'); // Ensure `db` is your database connection module
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up storage for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Define the folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); //Give the file a unique name
    },
});


const upload = multer({ storage: storage });

 
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


// Get all items    
router.get('/items', (req, res) => {
    const query = 'SELECT * FROM items';
  
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to fetch items' });
        }
        res.json(results);
    });
});


//Get items by category
router.get('/items/:category', (req, res) => {
    const category = req.params.category;
    const query = 'SELECT * FROM items WHERE category_id = ?';
  
    db.query(query, [category], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to fetch items' });
        }
        res.json(results);
    });
});


// Add a new item
router.post('/items', upload.single('image'), (req, res) => {
    const { pname, description, price, pricetype, status, categoryid } = req.body;
    let imagePath = null;
  
    if (req.file) {
        imagePath = req.file.path; // Store the image path if an image is uploaded
    }
  
    const query = 'INSERT INTO items (name, description, image, price, pricetype, status, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
    db.query(query, [pname, description, imagePath, price, pricetype, status, categoryid], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to add item' });
        }
        res.status(201).json({ message: 'Item added successfully', itemId: results.insertId });
    });
});
  

// Update an item
router.put('/items/:id', upload.single('image'), (req, res) => {
    const itemId = req.params.id;
    const { pname, description, price, pricetype, status, categoryid } = req.body;
    let imagePath = null;
  
    if (req.file) {
        imagePath = req.file.path; // If a new image is uploaded, use it
    }
  
    const query = 'UPDATE items SET name = ?, description = ?, image = ?, price = ?, pricetype = ?, status = ?, category_id = ? WHERE id = ?';
  
    db.query(query, [pname, description, imagePath, price, pricetype, status, categoryid, itemId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to update item' });
        }
        res.json({ message: 'Item updated successfully' });
    });
});


// Delete an item
router.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const query = 'DELETE FROM items WHERE id = ?';
  
    db.query(query, [itemId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to delete item' });
        }
        res.json({ message: 'Item deleted successfully' });
    });
});


module.exports = router;