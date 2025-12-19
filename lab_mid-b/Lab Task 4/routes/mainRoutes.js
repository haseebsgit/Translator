const express = require('express');
const router = express.Router();

// Import Controllers
const pageController = require('../controllers/pageController');
const productController = require('../controllers/productController'); // Needed for Assignment 3

// --- Standard Pages ---
router.get('/', pageController.getHomePage);
router.get('/about', pageController.getAboutPage);
router.get('/services', pageController.getServicesPage);
router.get('/languages', pageController.getLanguagesPage);
router.get('/testimonials', pageController.getTestimonialsPage);
router.get('/contact', pageController.getContactPage);

// --- Assignment 3: Shop & Database Routes ---
router.get('/products', productController.getProducts);    
router.get('/seed-data', productController.seedDatabase);  

module.exports = router;