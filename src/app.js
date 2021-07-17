const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()


// define paths for express config
const publicpath = path.join(__dirname, '../public')    //join the public folder
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//setup static directory
app.use(express.static(publicpath)) 

// setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Rutuja Deshpande'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rutuja Deshpande'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        contact: 'rutu@gmail.com',
        name: 'Rutuja Deshpande'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address){
       return res.send({
            error: 'you must provide an address/location!!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location}) => {
        if(error){
            return res.send({ error })
        }
        forcast(latitude, longitude, (error, forcastdata) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forcast: forcastdata,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/products', (req, res) => {
    if(!req.query.search){
         return res.send({
            error: 'You must provide the search term!!'
        })
    }
    console.log(req.query)
       res.send({
           products: []
       })
})


app.get('/help/*', (req, res) => {
     res.render('404', {
         title:'404',
         name: 'Rutuja Deshpande',
         errormsg: 'Help article not found'
     })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rutuja Deshpande',
        errormsg: 'page not found'
    })
})







app.listen(3000, () => {
    console.log('server is up on port 3000')
})