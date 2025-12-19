const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// View engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(require('./routes/mainRoutes'));

// Database + Server
mongoose
  .connect('mongodb://0.0.0.0:27017/betranslator_shop')
  .then(() => app.listen(3000, () =>
    console.log('Server running on http://localhost:3000')
  ))
  .catch(console.error);
