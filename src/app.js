const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const PORT = process.env.PORT || 3000 ;

//Defining paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup Hbs engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//Serving static files
app.use(express.static(publicDir));

//get request for the server
app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Jude'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jude'
    });
}); 

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'A Help Page.',
        title: 'Help',
        name: 'Jude'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({
            error: 'You must provide an address.'
        });

    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err)
            return res.send({ err });
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(err)
                return res.send({ error });
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search)
        return res.send({
            error: 'You must provide a search term.'
        });
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article was not found',
        msg: 'The Help article was not found',
        name: 'Jude'
    });
});

//404 handeler
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page was not found!',
        msg: 'The page was not found',
        name: 'Jude'
    });
});

//Running server on port 3000
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});