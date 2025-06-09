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
        let ext = path.extname(file.originalname).toLowerCase();
        
        // Normalize jpeg to jpg
        if (ext === '.jpeg') ext = '.jpg';
    
        cb(null, Date.now() + ext);
    },
});

const upload = multer({ storage: storage });


// Get all categories
router.get('/categories', (req, res) => {
    const query = 'SELECT * FROM category';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).send({ error: 'Failed to fetch categories' });
        }
        res.json(results);
    });
});


// Add a new category
router.post('/categories', upload.single('image'), (req, res) => {

    const { Cname, Cstatus } = req.body;
    // let imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    let imagePath = null;

    if (req.file) {
        imagePath = req.file.path; // Store the image path if an image is uploaded
    }
  
    if (!Cname || !Cstatus || !imagePath ) {
        return res.status(400).json({ error: "All fields are required" });
    }
  
    const query = 'INSERT INTO category (category_name, category_image, category_status) VALUES (?, ?, ?)';
  
    db.query(query, [Cname, imagePath, Cstatus], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to add category' });
        }
        res.status(201).json({ message: 'Category added successfully', category_image: imagePath });
    });
});


// Update a category
router.put('/categories/:id', upload.single('image'), (req, res) => {
    // const itemId = req.params.id;
    const id = req.params.id;
    const { Cname, Cstatus } = req.body;
    // let imagePath = req.file ? `/uploads/${req.file.filename}` : null; 
    let imagePath = null;
    if (req.file) {
        imagePath = req.file.path; // If a new image is uploaded, use it
    }


    let query, values;
    if (imagePath) {
        query = 'UPDATE category SET category_name = ?, category_image = ?, category_status = ? WHERE category_id = ?';
        values = [Cname, imagePath, Cstatus, id];
    } else {
        query = 'UPDATE category SET category_name = ?, category_status = ? WHERE category_id = ?';
        values = [Cname, Cstatus, id];
    }

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to update category' });
        }
        res.json({ message: 'Category updated successfully' });
    });
    
  
    // if (req.file) {
    //     imagePath = req.file.path; // If a new image is uploaded, use it
    // }
  
    // const query = 'UPDATE category SET category_name = ?, category_image = ?, category_status = ? WHERE category_id = ?';
  
    // db.query(query, [Cname, imagePath, Cstatus, id], (err, results) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send({ error: 'Failed to update category' });
    //     }
    //     res.json({ message: 'Category updated successfully' });
    // });
});


// Delete a category
router.delete('/categories/:id', (req, res) => {
    const id = req.params.id;
    console.log("Received delete request for ID:", id);
    const query = 'DELETE FROM category WHERE category_id = ?';
  
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).send({ error: 'Failed to delete category' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json({ message: 'Category deleted successfully' });
    });
});


module.exports = router;