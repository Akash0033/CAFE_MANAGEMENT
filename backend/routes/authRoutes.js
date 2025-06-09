const express = require('express'); 
const db = require('../db'); 
const router = express.Router(); 

const multer = require('multer');
const path = require('path');




// Register 
router.post('/register', (req, res) => { 
    const { userName, userType, password } = req.body; 
    const sql = 'INSERT INTO login_master (user_name, user_type, user_password) VALUES (?, ?, ?)'; 
    db.query(sql, [userName, userType, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {  // MySQL duplicate entry error code
                return res.status(400).json({ message: 'Username already taken' });
            }
            return res.status(500).json({ message: 'Server error', error: err });
        }
        res.json({ message: 'Registration successful' }); 
        // if (err) return res.status(500).send(err); 
        // res.send('Registration successful'); 
    }); 
});


// Login 
router.post('/login', (req, res) => { 
    const { userName, password } = req.body; 
    const sql = `
        SELECT lm.*, s.student_status 
        FROM login_master lm 
        LEFT JOIN student s ON lm.user_name = s.student_register_number 
        WHERE lm.user_name = ? AND lm.user_password = ? AND (s.student_status = 'active' OR s.student_status IS NULL)
    `;
    db.query(sql, [userName, password], (err, result) => { 
        if (err) return res.status(500).json({ message: 'Server error', error: err }); 
        if (result.length > 0) { 
            res.json({ 
                success: true, 
                user_type: result[0].user_type, 
                login_id: result[0].login_id 
            }); 
        } else { 
            res.status(401).json({ message: 'Invalid credentials' }); 
        } 
    }); 
}); 



// Assuming you're using Express and a database connection
// Assuming db is already configured
router.post('/change-password', (req, res) => { 
    const { currentPassword, newPassword } = req.body;

    // Check if the current password is correct (for example, verify with database)
    const sql = 'SELECT * FROM login_master WHERE user_type = "admin"';
    db.query(sql, (err, result) => {
        if(err) return res.status(500).send('Error occuured');

        const user = result[0]; // Assuming there's only one admin user
        if(user) {
            //Directly compare the currentPassword (without bcrypt)
            if (user.user_password === currentPassword) { 
                // Update password directly (still not recommended to store passwords in plain text) 
                const updateSql = 'UPDATE login_master SET user_password = ? WHERE login_id = ?'; 
                db.query(updateSql, [newPassword, user.login_id], (err) => { 
                    if (err) return res.status(500).send('Failed to update password'); 
                    res.json({ success: true }); 
                }); 
            } else { 
                res.status(401).send('Incorrect current password'); 
            } 
        } else { 
            res.status(404).send('User not found');
        }
    });

});


// Admin Dashboard Counts
router.get('/admin/counts', (req, res) => {
    const queries = {
        categories: 'SELECT COUNT(*) AS count FROM category WHERE category_status = "active"',
        items: 'SELECT COUNT(*) AS count FROM items WHERE item_status = "active"',
        students: 'SELECT COUNT(*) AS count FROM student WHERE student_status = "active"',
        staff: 'SELECT COUNT(*) AS count FROM staff WHERE staff_status = "active"',
    };

    const results = {};
    let completedQueries = 0;

    for (const [key, query] of Object.entries(queries)) {
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching counts', error: err });
            }
            results[key] = result[0].count;
            completedQueries++;

            if (completedQueries === Object.keys(queries).length) {
                res.json(results);
            }
        });
    }
});

module.exports = router; 