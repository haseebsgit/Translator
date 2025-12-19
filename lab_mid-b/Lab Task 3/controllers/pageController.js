exports.getHomePage = (req, res) => {
    res.render('index', { 
        path: '/'  
    });
};

exports.getAboutPage = (req, res) => {
    res.render('about', {  
        path: '/about' 
    });
};

exports.getServicesPage = (req, res) => {
    res.render('services', {
        path: '/services' 
    });
};

exports.getLanguagesPage = (req, res) => {
    res.render('languages', {
        path: '/languages' 
    });
};

exports.getTestimonialsPage = (req, res) => {
    res.render('testimonials', {
        path: '/testimonials' 
    });
};

exports.getContactPage = (req, res) => {
    res.render('contact', { 
        path: '/contact' 
    });
};

