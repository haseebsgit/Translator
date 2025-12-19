exports.getHomePage = (req, res) => {
    res.render('index', { 
        pageTitle: 'Home', 
        path: '/'  
    });
};

exports.getAboutPage = (req, res) => {
    res.render('about', { 
        pageTitle: 'About Us', 
        path: '/about' 
    });
};

exports.getServicesPage = (req, res) => {
    res.render('services', { 
        pageTitle: 'Our Services', 
        path: '/services' 
    });
};

exports.getLanguagesPage = (req, res) => {
    res.render('languages', { 
        pageTitle: 'Languages', 
        path: '/languages' 
    });
};

exports.getTestimonialsPage = (req, res) => {
    res.render('testimonials', { 
        pageTitle: 'Customer Testimonials', 
        path: '/testimonials' 
    });
};

exports.getContactPage = (req, res) => {
    res.render('contact', { 
        pageTitle: 'Contact Us', 
        path: '/contact' 
    });
};