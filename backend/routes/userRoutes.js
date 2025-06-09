const express = require('express'); 
const db = require('../db'); 
const router = express.Router(); 



// Manage Users
router.get('/users', (req, res) => {
    const sql = 'SELECT login_id, user_name, user_type FROM login_master';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});


router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM login_master WHERE login_id = ?';
    db.query(sql, [id], (err) => {
        res.send('User deleted successfully');
    });
});


router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { userName, userType} = req.body;
    const sql = 'UPDATE login_master SET user_name = ?, user_type = ? WHERE login_id = ?';
    db.query(sql, [userName, userType, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('User updated successfully');
    });
});



module.exports = router; 