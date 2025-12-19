const express = require('express');

const mongoose = require('mongoose');
const path = require('path');

// Route Imports
const mainRoutes = require('./routes/mainRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public'))); 

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes
app.use(mainRoutes);
app.use(adminRoutes);

// Database & Server
mongoose.connect('mongodb://0.0.0.0:27017/betranslator_lab4')
    .then(() => {
        app.listen(3000, () => console.log('Server running: http://localhost:3000'));
    })
    .catch(err => console.log("DB Connection Error:", err));