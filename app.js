const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
require('dotenv').config()
const cookieParser = require('cookie-parser')


// Router
const usersRouter = require('./routes/users.js')
const productRouter = require('./routes/products.js')
const apiProductRouter = require('./routes/api/products.js')
const authRouter = require('./routes/auth.js')
    //Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error: ', err))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public'))) //able to access the directory of the project
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//Additional middleweare for CRUD operation
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5000 } //duration 1min
}))
app.use(flash())

app.use((req, res, next) => { //make it golbal to be able to use it every pages
    res.locals.success_msg = req.flash('success_msg') //store the flash message in locals
    res.locals.error_msg = req.flash('error_msg')
    res.locals.user = req.user || null
    next()
})

//Middleware for collect the data
const loggerMiddleware = (req, res, next) => {
    console.log(`Request receive at: ${new Date()}`)
    console.log(`Method: ${req.method}, URL: ${req.url}`)
    next()
}

app.use(loggerMiddleware)

//Use routers
app.use('/users', usersRouter)
app.use('/products', productRouter)
app.use('/api/products', apiProductRouter)
app.use('/auth', authRouter)

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