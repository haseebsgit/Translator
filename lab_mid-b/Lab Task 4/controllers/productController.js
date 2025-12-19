const Product = require('../models/Product');

// 1. GET Request to Show Products
exports.getProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sort } = req.query;
        let filter = {};

        // --- Category Filtering ---
        if (category && category !== 'All') {
            filter.category = category;
        }

        // --- Price Filtering ---
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // --- Sorting Logic ---
        let sortObj = {};
        if (sort === 'priceAsc') {
            sortObj.price = 1; // Low to High
        } else if (sort === 'priceDesc') {
            sortObj.price = -1; // High to Low
        } else {
            sortObj._id = 1; // Default
        }

        // --- Pagination ---
        const page = parseInt(req.query.page) || 1;
        const limit = 6; 
        const skip = (page - 1) * limit;

        const products = await Product.find(filter).sort(sortObj).skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        res.render('products', {
            pageTitle: 'Shop Products',
            path: '/products',
            products: products,
            currentPage: page,
            totalPages: totalPages,
            searchOptions: req.query 
        });

    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// 2. SEEDER: Re-populates the database
exports.seedDatabase = async (req, res) => {
    try {
        await Product.deleteMany({}); 
        const Data = [
            { name: "Business Translation", price: 150, category: "Service", description: "Professional business document translation.", image: "/images/business translation.jpg" },
            { name: "Legal Document Review", price: 300, category: "Consultation", description: "Expert legal review of translated docs.", image: "/images/legal document review.jpg" },
            { name: "Grammar Guide", price: 30, category: "Book", description: "Advanced grammar rules and tips.", image: "/images/grammar guide.jpg" },
            { name: "Dictionary App", price: 15, category: "Software", description: "Premium offline dictionary access.", image: "/images/dictionary app premium.png" },
            { name: "Interpreter (Live)", price: 80, category: "Consultation", description: "Live Zoom interpretation session.", image: "/images/interpreter.png" },
            { name: "Chinese Translation", price: 200, category: "Service", description: "Expert Mandarin translation services.", image: "/images/chinese.png" },
            { name: "French Language Pack", price: 45, category: "Service", description: "Complete French translation bundle.", image: "/images/french.png" },
            { name: "German Expert Review", price: 120, category: "Consultation", description: "Native German document verification.", image: "/images/german.png" },
            { name: "Japanese Interpretation", price: 95, category: "Consultation", description: "Business-level Japanese interpretation.", image: "/images/japanese.png" },
            { name: "English Prep Course", price: 60, category: "Book", description: "IELTS and TOEFL preparation materials.", image: "/images/english.png" },
            { name: "Translation Calendar", price: 10, category: "Software", description: "Manage your translation deadlines easily.", image: "/images/calendar.png" },
            { name: "Pro Video Translation", price: 500, category: "Service", description: "Full video dubbing and subtitling.", image: "/images/home_translator_video.jpg" }
        ];
        await Product.insertMany(Data);
        res.send("<h1>Database Seeded Successfully!</h1><a href='/products'>Go to Shop</a>");
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
};