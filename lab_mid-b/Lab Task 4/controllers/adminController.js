const Product = require('../models/Product');

exports.getDashboard = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        res.render('admin/dashboard', { 
            pageTitle: 'Admin Dashboard', 
            count: count 
        });
    } catch (err) {
        console.error("Dashboard Error:", err);
        res.status(500).send("Unable to load Dashboard");
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('admin/product', { 
            products: products, 
            pageTitle: 'Manage Inventory' 
        });
    } catch (err) {
        console.error("Fetch Error:", err);
        res.status(500).send("Error fetching inventory list");
    }
};

exports.getAddProduct = (req, res) => {
    res.render('admin/add-product', { pageTitle: 'Add New Product' });
};


exports.postAddProduct = async (req, res) => {
    try {
        // req.body contains form data: name, price, category, etc.
        await Product.create(req.body);
        res.redirect('/admin/products'); 
    } catch (err) {
        console.error("Create Error:", err);
        res.status(500).send("Error saving new product");
    }
};


exports.getEditProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        
        res.render('admin/edit-product', { 
            product: product, 
            pageTitle: 'Edit Product' 
        });
    } catch (err) {
        res.status(500).send("Error loading edit page");
    }
};


exports.postEditProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/admin/products');
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).send("Error updating product");
    }
};


exports.postDeleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/admin/products');
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Error deleting product");
    }
};