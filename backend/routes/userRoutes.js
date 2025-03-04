const express = require('express'); 
const db = require('../db'); 
const router = express.Router(); 

const multer = require('multer');
const path = require('path');


// Manage Users
router.get('/users', (req, res) => {
    const sql = 'SELECT id, name, email, role FROM users';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});


router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err) => {
        res.send('User deleted successfully');
    });
});


router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, role} = req.body;
    const sql = 'UPDATE users SET name = ?, email = ?, role = ? WHERE ID = ?';
    db.query(sql, [name, email, role, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('User updated successfully');
    });
});

module.exports = router; 