const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin', adminController.getDashboard);
router.get('/admin/products', adminController.getProducts);

router.get('/admin/add-product', adminController.getAddProduct);
router.post('/admin/add-product', adminController.postAddProduct);

router.get('/admin/edit-product/:id', adminController.getEditProduct);
router.post('/admin/edit-product/:id', adminController.postEditProduct);

router.post('/admin/delete-product/:id', adminController.postDeleteProduct);

module.exports = router;