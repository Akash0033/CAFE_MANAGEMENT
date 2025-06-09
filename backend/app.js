const express = require('express'); 
const bodyParser = require('body-parser'); 
const dotenv = require('dotenv'); 
const path = require('path'); 
const cors = require('cors');

const authRoutes = require('./routes/authRoutes'); 
const otpRoutes = require('./routes/otpRoutes'); 
const itemRoutes = require('./routes/itemRoutes'); 
const userRoutes = require('./routes/userRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes'); 
const studentRoutes = require('./routes/studentRoutes'); 
const staffRoutes = require('./routes/staffRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config(); 
const app = express(); 
app.use(cors()); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use(bodyParser.json()); 
app.use('/api/auth', authRoutes); 
app.use('/api/otp', otpRoutes); 
app.use('/api/item', itemRoutes); 
app.use('/api/user', userRoutes); 
app.use('/api/category', categoryRoutes); 
app.use('/api/student', studentRoutes); 
app.use('/api/staff', staffRoutes); 
app.use('/api', bookingRoutes);
app.use('/api', adminRoutes);

const PORT = process.env.PORT || 5000; 


app.listen(PORT, () => { 
    console.log(`Server running on http://localhost:${PORT}`); 
});