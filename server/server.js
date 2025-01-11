const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path'); // Add this line  
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Add this line to serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/chat', require('./routes/chat'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));