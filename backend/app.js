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


const PORT = process.env.PORT || 5000; 


app.listen(PORT, () => { 
    console.log(`Server running on http://localhost:${PORT}`); 
});