const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()

// Define path fot Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

// Setup handlebars engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
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
    res.send('Weather page')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})