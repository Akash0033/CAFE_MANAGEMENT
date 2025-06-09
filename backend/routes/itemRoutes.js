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
// router.get('/categories', (req, res) => {
//     const query = 'SELECT * FROM category';

//     db.query(query, (err, results) => {
//         if (err) {
//             console.error(err)
//             return res.status(500).send({ error: 'Failed to fetch categories' });
//         }
//         res.json(results);
//     });
// });


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
    const { Iname, description, price, status, categoryid } = req.body;
    let imagePath = null;
  
    if (req.file) {
        imagePath = req.file.path; // Store the image path if an image is uploaded
    }
  
    const query = 'INSERT INTO items (category_id, item_name, item_image, item_status, item_price, item_description ) VALUES (?, ?, ?, ?, ?, ?)';
  
    db.query(query, [categoryid, Iname, imagePath, status, price, description], (err, results) => {
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
    const { Iname, description, price, status, categoryid } = req.body;

    // Get existing image if no new image is uploaded
    const getImageQuery = 'SELECT item_image FROM items WHERE item_id = ?';
    db.query(getImageQuery, [itemId], (Ierr, results) => {
        if (Ierr) {
            console.error(Ierr);
            return res.status(500).send({ error: 'Failed to fetch item' });
        }

        let imagePath = results.length > 0 ? results[0].item_image : null;
    
        if (req.file) {
            imagePath = req.file.path; // If a new image is uploaded, use it
        }
    
        const query = 'UPDATE items SET category_id = ?, item_name = ?, item_image = ?, item_status = ?, item_price = ?, item_description = ? WHERE item_id = ?';
    
        db.query(query, [categoryid, Iname, imagePath, status, price, description, itemId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: 'Failed to update item' });
            }
            res.json({ message: 'Item updated successfully' });
        });
    });
});


// Delete an item
router.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const query = 'DELETE FROM items WHERE item_id = ?';
  
    db.query(query, [itemId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to delete item' });
        }
        res.json({ message: 'Item deleted successfully' });
    });
});

// Get items by category
router.get('/items-by-category', (req, res) => {
    const query = `
        SELECT i.*, c.category_name 
        FROM items i
        JOIN category c ON i.category_id = c.category_id
        WHERE i.item_status = 'Active'
        ORDER BY c.category_name, i.item_name
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Failed to fetch items' });
        }
        
        // Group items by category
        const categorizedItems = results.reduce((acc, item) => {
            if (!acc[item.category_name]) {
                acc[item.category_name] = [];
            }
            acc[item.category_name].push(item);
            return acc;
        }, {});

        res.json(categorizedItems);
    });
});


// Create order
router.post('/create-order', (req, res) => {
    const { studentId, items, totalPrice, servingTime } = req.body;
    
    const tokenNumber = Math.floor(100000 + Math.random() * 900000).toString();

    // Start a transaction
    db.beginTransaction((err) => {
        if (err) { 
            return res.status(500).send({ error: 'Transaction start failed' });
        }

        // First, get the student email address
        const getEmailQuery = `
          SELECT s.student_email_address FROM student s LEFT JOIN login_master lm ON s.student_register_number = lm.user_name 
          WHERE lm.login_id = ?
        `;
        
        db.query(getEmailQuery, [studentId], (err, emailResults) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).send({ error: 'Failed to retrieve student email' });
                });
            }

            if (!emailResults[0]) {
                // login_id exists, but no matching student record
                return db.rollback(() => {
                    res.status(404).send({ error: 'Student data does not exist' });
                });
            }

            if (emailResults.length === 0) {
                return db.rollback(() => {
                    res.status(404).send({ error: 'Student email not found' });
                });
            }

            
            const studentEmail = emailResults[0].student_email_address;

            // Insert into booking table with serving time
            const bookingQuery = `
                INSERT INTO booking (
                    student_id, 
                    booking_status, 
                    booking_date, 
                    barcode_number, 
                    serving_time
                ) VALUES (?, ?, NOW(), ?, ?)
            `;
            
            db.query(
                bookingQuery, 
                [studentId, 'Order Placed', tokenNumber, servingTime], 
                (err, bookingResult) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).send({ error: 'Failed to create booking' });
                        });
                    }

                    const bookingId = bookingResult.insertId;

                    // Insert items into temp table
                    const itemPromises = items.map(item => {
                        return new Promise((resolve, reject) => {
                            const tempQuery = 'INSERT INTO temp (token_number, item_id, quantity) VALUES (?, ?, ?)';
                            
                            db.query(tempQuery, [tokenNumber, item.item_id, item.quantity], (err) => {
                                if (err) reject(err);
                                else resolve();
                            });
                        });
                    });

                    Promise.all(itemPromises)
                        .then(() => {
                            // Send email notification
                            sendOrderConfirmationEmail(studentEmail, tokenNumber, items, totalPrice, servingTime)
                                .then(() => {
                                    db.commit((err) => {
                                        if (err) {
                                            return db.rollback(() => {
                                                res.status(500).send({ error: 'Commit failed' });
                                            });
                                        }
                                        res.status(201).json({ 
                                            message: 'Order created successfully and email sent', 
                                            bookingId,
                                            tokenNumber 
                                        });
                                    });
                                })
                                .catch((emailErr) => {
                                    // We can still commit the transaction even if email fails
                                    // But we'll log the error and notify in the response
                                    console.error('Email sending failed:', emailErr);
                                    
                                    db.commit((err) => {
                                        if (err) {
                                            return db.rollback(() => {
                                                res.status(500).send({ error: 'Commit failed' });
                                            });
                                        }
                                        res.status(201).json({ 
                                            message: 'Order created successfully but email notification failed', 
                                            bookingId,
                                            tokenNumber 
                                        });
                                    });
                                });
                        })
                        .catch((err) => {
                            return db.rollback(() => {
                                res.status(500).send({ error: 'Failed to process order items' });
                            });
                        });
                }
            );
        });
    });
});

// Function to send email
function sendOrderConfirmationEmail(email, tokenNumber, items, totalPrice, servingTime) {
    return new Promise((resolve, reject) => {
       
        const subject = 'Your Order Confirmation';
        const body = `
            <h2>Order Confirmation</h2>
            <p>Thank you for your order!</p>
            <p><strong>Token Number:</strong> ${tokenNumber}</p>
            <p><strong>Serving Time:</strong> ${servingTime}</p>
            <p><strong>Total Price:</strong> ${totalPrice}</p>
            
    
            
            <p>Please present your token number when collecting your order.</p>
        `;
        

        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',  // or your email service
            auth: {
                user: 'akashlobo0311@gmail.com', 
                pass: 'nxjn sntt cwjr zkct', 
            }
        });
        
        const mailOptions = {
            from: 'akashlobo0311@gmail.com',
            to: email,
            subject: subject,
            html: body
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
        
        
        // For now, we'll just resolve the promise immediately
        // Replace this with your actual email sending code
        resolve();
    });
}

module.exports = router;