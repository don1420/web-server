const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define path fot Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        description: 'Use this site to get your wether.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if (error) {
            return res.send({
                error: `Geocode error: ${error}`
            })
        }
    
        forecast(latitude, longitude, (forecastError, forecastData) => {
            if (error) {
                return res.send({
                    error: `Forecast error: ${forecastError}`
                })
            }

            return res.send({
                forecast: forecastData.weather_descriptions,
                temperature: `It is currently ${forecastData.temperature} degress out`,
                feelslike: `It feels like ${forecastData.feelslike} degress out.`,
                location: `${location}; latitude/longitude: ${latitude}/${longitude}`,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})