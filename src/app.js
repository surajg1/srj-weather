const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocodes')
const forcast = require('./utils/forcast')

// set up the Paths
const PORT = process.env.PORT || 8006;
const app = express()
const PublicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templetes/views')
const partialPath = path.join(__dirname, '../templetes/partials')


// Handle the views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
    // Static directory to Serve
app.use(express.static(PublicDirectoryPath))


app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather',
        name: 'Suraj Gholap'
    })

})

app.get('/suraj', (req, res) => {
    res.render('suraj', {
        title: "Its Suraj",
        suraj: 'The Great Suraj'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'No Adrress Found!'
        })
    }

    geocode(address, (error, { latitude, longitude, location }) => {

        forcast(latitude, longitude, (error, { summary, temp, RP }) => {
            res.send({
                location: location,
                summary: summary,
                temp: temp,
                RP: RP

            })
        })

    })
})


app.get('/product', (req, res) => {

    if (!req.query.search) {
        res.send({
            error: "Unable to get your imformation!"
        })

    }

    console.log(req.query);

    res.send({
        product: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Suraj Gholap',
        name: 'Its Me'
    });
})



app.get('/help', (req, res) => {

    res.render('help', {
        help: 'What can i help you?',
        title: 'Help!'
    })

})

app.get('*', (req, res) => {
    res.render('404', {

        title: '404 page Not FONND',
        name: "Suraj Gholap"
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help ka page Not FONND',
        name: 'Suraj Gholap'
    })
})




app.listen(PORT, () => {
    console.log(" Server is Runnng in ");
})