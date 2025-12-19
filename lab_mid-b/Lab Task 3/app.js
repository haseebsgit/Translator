const express = require('express');
const app = express();
const mainRoutes = require('./routes/mainRoutes');


app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(mainRoutes);


app.use((req, res) => {
    res.status(404).render('404', { 
        pageTitle: 'Page Not Found', 
        path: '',
        layout: 'layouts/main-layout' 
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));