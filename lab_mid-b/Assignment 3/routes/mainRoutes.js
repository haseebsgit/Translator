const express = require('express');
const router = express.Router();

// Import Controllers
const pageController = require('../controllers/pageController');
const productController = require('../controllers/productController'); 

// Page Routes
router.get('/', pageController.getHomePage);
router.get('/about', pageController.getAboutPage);
router.get('/services', pageController.getServicesPage);
router.get('/languages', pageController.getLanguagesPage);
router.get('/testimonials', pageController.getTestimonialsPage);
router.get('/contact', pageController.getContactPage);

// Product Routes
router.get('/products', productController.getProducts);    
router.get('/seed-data', productController.seedDatabase);  

module.exports = router;