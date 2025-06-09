const express = require('express');
const db = require('../db');
const router = express.Router();

// Get Staffs
router.get('/staffs', (req, res) => {
    const sql = 'SELECT * FROM staff';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Add Staff
router.post('/staffs', (req, res) => {
    const { name, phonenumber, email, status } = req.body;
    
    // Generate random username and password like in PHP
    const username = "STAFF" + Math.floor(Math.random() * (9999 - 1111 + 1) + 1111);
    const password = "PSD" + Math.floor(Math.random() * (9999 - 1111 + 1) + 1111);

    const staffSql = 'INSERT INTO staff (staff_name, staff_email_id, staff_phone_number, staff_status, staff_date_create, staff_login) VALUES (?, ?, ?, ?, NOW(), ?)';
    const loginSql = 'INSERT INTO login_master (user_name, user_type, user_password, login_date) VALUES (?, "Staff", ?, NOW())';

    // First, insert into staff table
    db.query(staffSql, [name, email, phonenumber, status, username], (err, staffResult) => {
        if (err) {
            console.error('Staff insertion error:', err);
            return res.status(500).send({ error: 'Failed to add staff' });
        }

        // Then, insert into login_master
        db.query(loginSql, [username, password], (loginErr, loginResult) => {
            if (loginErr) {
                console.error('Login master insertion error:', loginErr);
                // Optionally, you might want to delete the staff record if login insertion fails
                return res.status(500).send({ error: 'Failed to create login credentials' });
            }

            res.status(201).send({ 
                message: 'Staff added successfully', 
                username: username, 
                password: password 
            });
        });
    });
});

// Update Staff
router.put('/staffs/:id', (req, res) => {
    const { id } = req.params;
    const { name, phonenumber, email, status } = req.body;

    const sql = 'UPDATE staff SET staff_name=?, staff_email_id=?, staff_phone_number=?, staff_status=? WHERE staff_id=?';
    
    db.query(sql, [name, email, phonenumber, status, id], (err, result) => {
        if (err) {
            console.error('Update error:', err);
            return res.status(500).send({ error: 'Failed to update staff' });
        }
        res.send({ message: 'Staff updated successfully' });
    });
});

// Delete Staff
router.delete('/staffs/:id', (req, res) => {
    const { id } = req.params;

    // First, get the staff login username
    const getLoginSql = 'SELECT staff_login FROM staff WHERE staff_id = ?';
    
    db.query(getLoginSql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching staff login:', err);
            return res.status(500).send({ error: 'Failed to retrieve staff login' });
        }

        if (results.length === 0) {
            return res.status(404).send({ error: 'Staff not found' });
        }

        const username = results[0].staff_login;

        // Delete from login_master first
        const deleteLoginSql = 'DELETE FROM login_master WHERE user_name = ?';
        db.query(deleteLoginSql, [username], (loginDelErr) => {
            if (loginDelErr) {
                console.error('Error deleting from login_master:', loginDelErr);
                return res.status(500).send({ error: 'Failed to delete login credentials' });
            }

            // Then delete from staff
            const deleteStaffSql = 'DELETE FROM staff WHERE staff_id = ?';
            db.query(deleteStaffSql, [id], (staffDelErr) => {
                if (staffDelErr) {
                    console.error('Error deleting from staff:', staffDelErr);
                    return res.status(500).send({ error: 'Failed to delete staff' });
                }

                res.send({ message: 'Staff deleted successfully' });
            });
        });
    });
});

module.exports = router;