// const express = require('express'); 
// const db = require('../db'); 
// const router = express.Router(); 
// const multer = require('multer');
// const path = require('path');


// // Set up storage for image uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads'); // Define the folder for uploaded files
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); //Give the file a unique name
//     },
// });

// const upload = multer({ storage: storage });



// // Get Students
// router.get('/students', (req, res) => {
//     const sql = 'SELECT * FROM student';
//     db.query(sql, (err, results) => {
//         if (err) return res.status(500).send(err);
//         res.json(results);
//     });
// });
// // student_id, student_name, student_register_number, student_address, student_phone_number, student_email_address, student_image, balance, student_status


// router.post('/students', upload.single('image'), (req, res) => { 
//     const { name, regno, address, phoneno, email, balance, status } = req.body; 
//     let imagePath = null;

//     if (req.file) {
//         imagePath = req.file.path; // Store the image path if an image is uploaded
//     }

//     const sql = 'INSERT INTO student (student_name, student_register_number, student_address, student_phone_number, student_email_address, student_image, balance, student_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'; 
//     db.query(sql, [name, regno, address, phoneno, email, imagePath, balance, status], (err, result) => { 
//         if (err) return res.status(500).send(err); 
//         res.send('Student added successfully'); 
//     }); 
// });


// // Update
// router.put('/students/:id', upload.single('image'), (req, res) => {
//     const { id } = req.params;
//     const { name, regno, address, phoneno, email, balance, status } = req.body;

//     let imagePath = null;
//     if (req.file) {
//         imagePath = req.file.path; // If a new image is uploaded, use it
//     }

//     let query, values;
//     if (imagePath) {
//         query = 'UPDATE student SET student_name = ?, student_register_number = ?, student_address = ?, student_phone_number = ?, student_email_address = ?, student_image = ?, balance = ?, student_status = ? WHERE student_id = ?';
//         values = [name, regno, address, phoneno, email, imagePath, balance, status, id];
//     } else {
//         query = 'UPDATE student SET student_name = ?, student_register_number = ?, student_address = ?, student_phone_number = ?, student_email_address = ?, balance = ?, student_status = ? WHERE student_id = ?';
//         values = [name, regno, address, phoneno, email, balance, status, id];
//     }

//     db.query(query, values, (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send({ error: 'Failed to update student' });
//         }
//         res.json({ message: 'Student updated successfully' });
//     });

//     // const sql = 'UPDATE students SET student_id, student_name = ?, student_register_number = ?, student_phone_number = ?, student_email_address = ?, balance = ?, student_status = ? WHERE student_id = ?';
//     // db.query(sql, [name, regno, phoneno, email, balance, status, id], (err) => {
//     //     if (err) return res.status(500).send(err);
//     //     res.send('Student updated successfully');
//     // });
// });


// // Delete
// router.delete('/students/:id', (req, res) => {
//     const { id } = req.params;
//     const sql = 'DELETE FROM student WHERE student_id = ?';
//     db.query(sql, [id], (err) => {
//         res.send('Student deleted successfully');
//     });
// });



// module.exports = router; 





const express = require('express');
const db = require('../db');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { error } = require('console');

// Set up storage for image uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDir = './uploads';
//         // Create directory if it doesn't exist
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//         }
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         // Create unique filename with timestamp and original extension
//         const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
//         cb(null, uniqueName);
//     },
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Define the folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); //Give the file a unique name
    },
});

const upload = multer({ storage: storage });

// File filter to only allow images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and GIF images are allowed.'), false);
    }
};

// const upload = multer({ 
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 5 * 1024 * 1024, // 5MB max file size
//     }
// });

// Get all students
router.get('/students', (req, res) => {
    const sql = 'SELECT * FROM student ORDER BY student_id DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch students', details: err.message });
        }
        res.json(results);
    });
});

// Get single student by ID
router.get('/students/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM student WHERE student_id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(results[0]);
    });
});

router.put('/students/recharge/:id', (req, res) => {
    const { id } = req.params;
    const { balance } = req.body;
    
    // Validate input
    if (balance === undefined || isNaN(balance)) {
        return res.status(400).json({ error: 'Valid balance amount is required' });
    }
    
    const sql = 'UPDATE student SET balance = ? WHERE student_id = ?';
    db.query(sql, [balance, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        // Return updated student data
        const fetchSql = 'SELECT * FROM student WHERE student_id = ?';
        db.query(fetchSql, [id], (fetchErr, results) => {
            if (fetchErr) {
                return res.status(200).json({ message: 'Balance updated successfully', student_id: id });
            }
            res.status(200).json(results[0]);
        });
    });
});

// // Add new student
// router.post('/students', upload.single('image'), (req, res) => {
//     try {
//         const { name, regno, address, phoneno, email, balance, status } = req.body;
        
//         // Validation
//         if (!name || !regno || !address || !phoneno || !email || !req.file) {
//             return res.status(400).json({ error: 'All fields are required including image' });
//         }
        
//         // Validate register number (10 alphanumeric)
//         if (!/^[a-zA-Z0-9]{12}$/.test(regno)) {
//             return res.status(400).json({ error: 'Register number must be 10 alphanumeric characters' });
//         }
        
//         // Validate phone number (10 digits)
//         if (!/^[0-9]{10}$/.test(phoneno)) {
//             return res.status(400).json({ error: 'Phone number must be 10 digits' });
//         }
        
//         // Validate email format
//         if (!/\S+@\S+\.\S+/.test(email)) {
//             return res.status(400).json({ error: 'Invalid email format' });
//         }
        
//         // Store relative path in database - fix for image path
//         const imagePath = req.file.path.replace(/\\/g, '\\');
        
//         // Set default values - fix for balance NaN
//         const studentStatus = status || 'Active';
//         const studentBalance = parseFloat(balance) || 0;
        
//         // Generate random password (like in PHP)
//         const password = "STD" + Math.floor(1000 + Math.random() * 9000);
        
//         // Use transaction to ensure both student and login record are created
//         db.beginTransaction(err => {
//             if (err) {
//                 return res.status(500).json({ error: 'Transaction error', details: err.message });
//             }
            
//             // Insert student record
//             const studentSql = `INSERT INTO student 
//                 (student_name, student_register_number, student_address, student_phone_number, 
//                 student_email_address, student_image, student_status, student_date_create, balance) 
//                 VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)`;
                
//             db.query(studentSql, 
//                 [name, regno, address, phoneno, email, imagePath, studentStatus, studentBalance], 
//                 (err, result) => {
//                     if (err) {
//                         db.rollback(() => {
//                             console.error('Database error on student insert:', err);
//                             return res.status(500).json({ error: 'Failed to add student', details: err.message });
//                         });
//                         return;
//                     }

                    
//                     // Insert login record (similar to PHP implementation)
//                     const loginSql = `INSERT INTO login_master 
//                         (user_name, user_type, user_password, login_date) 
//                         VALUES (?, 'Student', ?, NOW())`;
                        
//                     db.query(loginSql, [regno, password], (err, loginResult) => {
//                         if (err) {
//                             db.rollback(() => {
//                                 console.error('Database error on login insert:', err);
//                                 return res.status(500).json({ error: 'Failed to create login record', details: err.message });
//                             });
//                             return;
//                         }
                        
//                         // Commit transaction
//                         db.commit(err => {
//                             if (err) {
//                                 db.rollback(() => {
//                                     return res.status(500).json({ error: 'Failed to commit transaction', details: err.message });
//                                 });
//                                 return;
//                             }
                            
//                             res.status(201).json({ 
//                                 message: 'Student added successfully',
//                                 studentId: result.insertId,
//                                 loginInfo: {
//                                     username: regno,
//                                     password: password,
//                                     type: 'Student'
//                                 }
//                             });
//                         });
//                     });

//                 }
//             );
//         });
//     } catch (error) {
//         console.error('Server error:', error);
//         res.status(500).json({ error: 'Server error', details: error.message });
//     }
// });


// Add new student
router.post('/students', upload.single('image'), (req, res) => {
    try {
        const { name, regno, address, phoneno, email, balance, status } = req.body;
        
        // Validation
        if (!name || !regno || !address || !phoneno || !email || !req.file) {
            return res.status(400).json({ error: 'All fields are required including image' });
        }

        // Validate register number (12 alphanumeric)
        if (!/^[a-zA-Z0-9]{12}$/.test(regno)) {
            return res.status(400).json({ error: 'Register number must be 12 alphanumeric characters' });
        }

        // Validate phone number (10 digits)
        if (!/^[0-9]{10}$/.test(phoneno)) {
            return res.status(400).json({ error: 'Phone number must be 10 digits' });
        }

        // Validate email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const imagePath = req.file.path.replace(/\\/g, '\\');
        const studentStatus = status || 'Active';
        const studentBalance = parseFloat(balance) || 0;
        const password = "STD" + Math.floor(1000 + Math.random() * 9000);

        db.beginTransaction(err => {
            if (err) {
                return res.status(500).json({ error: 'Transaction error', details: err.message });
            }

            // Check if user already exists in login_master
            const checkUserSql = `SELECT user_name FROM login_master WHERE user_name = ?`;
            db.query(checkUserSql, [regno], (err, userResults) => {
                if (err) {
                    db.rollback(() => {
                        console.error('Database error on user check:', err);
                        return res.status(500).json({ error: 'Failed to check existing user', details: err.message });
                    });
                    return;
                }

                // Insert into student table
                const studentSql = `INSERT INTO student 
                    (student_name, student_register_number, student_address, student_phone_number, 
                    student_email_address, student_image, student_status, student_date_create, balance) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)`;

                db.query(studentSql, 
                    [name, regno, address, phoneno, email, imagePath, studentStatus, studentBalance], 
                    (err, result) => {
                        if (err) {
                            db.rollback(() => {
                                console.error('Database error on student insert:', err);
                                return res.status(500).json({ error: 'Failed to add student', details: err.message });
                            });
                            return;
                        }

                        // If user already exists in login_master, skip inserting into login_master
                        if (userResults.length > 0) {
                            db.commit(err => {
                                if (err) {
                                    db.rollback(() => {
                                        return res.status(500).json({ error: 'Failed to commit transaction', details: err.message });
                                    });
                                    return;
                                }

                                res.status(201).json({ 
                                    message: 'Student added successfully (login already exists)',
                                    studentId: result.insertId
                                });
                            });
                        } else {
                            // User doesn't exist — insert login record
                            const loginSql = `INSERT INTO login_master 
                                (user_name, user_type, user_password, login_date) 
                                VALUES (?, 'Student', ?, NOW())`;

                            db.query(loginSql, [regno, password], (err, loginResult) => {
                                if (err) {
                                    db.rollback(() => {
                                        console.error('Database error on login insert:', err);
                                        return res.status(500).json({ error: 'Failed to create login record', details: err.message });
                                    });
                                    return;
                                }

                                db.commit(err => {
                                    if (err) {
                                        db.rollback(() => {
                                            return res.status(500).json({ error: 'Failed to commit transaction', details: err.message });
                                        });
                                        return;
                                    }

                                    res.status(201).json({ 
                                        message: 'Student and login added successfully',
                                        studentId: result.insertId,
                                        loginInfo: {
                                            username: regno,
                                            password: password,
                                            type: 'Student'
                                        }
                                    });
                                });
                            });
                        }
                    }
                );
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});


// Update student
router.put('/students/:id', upload.single('image'), (req, res) => {
    try {
        const { id } = req.params;
        const { name, regno, address, phoneno, email, balance, status } = req.body;
        
        // Basic validation
        if (!name || !regno || !address || !phoneno || !email) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }
        
        // Prepare update query
        let sql, values;
        
        // Check if a new image was uploaded
        if (req.file) {
            // Get old image path to delete it later
            db.query('SELECT student_image FROM student WHERE student_id = ?', [id], (err, results) => {
                if (!err && results.length > 0 && results[0].student_image) {
                    // Try to delete the old image file
                    const oldImagePath = 'uploads/' + results[0].student_image;
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlink(oldImagePath, (err) => {
                            if (err) console.error('Error deleting old image:', err);
                        });
                    }
                }
            });
            
            // Store relative path in database - fix for image path
            const imagePath = req.file.path.replace(/\\/g, '\\');
            sql = `UPDATE student SET 
                student_name = ?, 
                student_register_number = ?, 
                student_address = ?, 
                student_phone_number = ?, 
                student_email_address = ?, 
                student_image = ?, 
                balance = ?, 
                student_status = ? 
                WHERE student_id = ?`;
            values = [name, regno, address, phoneno, email, imagePath, parseFloat(balance) || 0, status, id];
        } else {
            // No new image, don't update the image field
            sql = `UPDATE student SET 
                student_name = ?, 
                student_register_number = ?, 
                student_address = ?, 
                student_phone_number = ?, 
                student_email_address = ?, 
                balance = ?, 
                student_status = ? 
                WHERE student_id = ?`;
            values = [name, regno, address, phoneno, email, parseFloat(balance) || 0, status, id];
        }
        
        // Execute update query
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to update student', details: err.message });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
            
            res.json({ message: 'Student updated successfully', studentId: id });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Delete student
router.delete('/students/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        // First get the student record to find the image path and register number
        db.query('SELECT student_image, student_register_number FROM student WHERE student_id = ?', 
            [id], 
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error', details: err.message });
                }
                
                if (results.length === 0) {
                    return res.status(404).json({ error: 'Student not found' });
                }
                
                const { student_image, student_register_number } = results[0];
                
                // Begin transaction to delete student and login records
                db.beginTransaction(err => {
                    if (err) {
                        return res.status(500).json({ error: 'Transaction error', details: err.message });
                    }
                    
                    // Delete student record
                    db.query('DELETE FROM student WHERE student_id = ?', [id], (err, result) => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Failed to delete student', details: err.message });
                            });
                        }
                        
                        // Delete corresponding login record
                        db.query('DELETE FROM login_master WHERE user_name = ? AND user_type = "Student"', 
                            [student_register_number], 
                            (err, loginResult) => {
                                if (err) {
                                    return db.rollback(() => {
                                        res.status(500).json({ error: 'Failed to delete login record', details: err.message });
                                    });
                                }
                                
                                // Commit transaction
                                db.commit(err => {
                                    if (err) {
                                        return db.rollback(() => {
                                            res.status(500).json({ error: 'Failed to commit transaction', details: err.message });
                                        });
                                    }
                                    
                                    // Delete image file if it exists
                                    if (student_image) {
                                        try {
                                            const imagePath = 'uploads/' + student_image;
                                            if (fs.existsSync(imagePath)) {
                                                fs.unlinkSync(imagePath);
                                            }
                                        } catch (error) {
                                            console.error('Error deleting image file:', error);
                                            // Continue even if image deletion fails
                                        }
                                    }
                                    
                                    res.json({ message: 'Student deleted successfully' });
                                });
                            }
                        );
                    });
                });
            }
        );
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = router;