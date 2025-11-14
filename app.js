const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config()

const usersRouter = require('./routes/users.js')
const productRouter = require('./routes/products.js')

//Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error: ', err))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public'))) //able to access the directory of the project

//Additional middleweare for CRUD operation
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//Middleware for collect the data
const loggerMiddleware = (req, res, next) => {
    console.log(`Request receive at: ${new Date()}`)
    console.log(`Method: ${req.method}, URL: ${req.url}`)
    next()
}

app.use(loggerMiddleware)

app.use('/users', usersRouter)
app.use('/products', productRouter)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'This is index page',
        heading: 'Welcome to EJS'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is about page',
        heading: 'kuy',
        content: 'Namo so handsome'
    })
})
app.get('/products', (req, res) => {
    const products = [
        { name: 'iphone16', price: 50000 },
        { name: 'MacbookPro', price: 70000 },
        { name: 'Airpod pro', price: 8990 },
    ]
    res.render('products', { products: products })
})

app.listen(port, () => {
    console.log('Server is running. . . ')
})