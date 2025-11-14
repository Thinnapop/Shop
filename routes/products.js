const express = require('express')
const router = express.Router()
const Product = require('../module/Product')

// -------------
// Create
// -------------
//Route 1: display form for create new product (using get method)
router.get('/new', (req, res) => {
    res.render('products/new-products')
})

//Route 2 : receive the infomation then create the new product (POST)
router.post('/', async(req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,

        })
        await newProduct.save() // save in database
        res.redirect('/products') //go back to product page
    } catch (error) {
        console.error(error)
        res.status(500).send('Cannot create a new product')
    }
})

// -------------
// Read 
// -------------

//Route 3: Display all product using get
router.get('/', async(req, res) => {
    try {
        const products = await Product.find({}) //get all data from database
        res.render('products/index', { products: products })
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
})

module.exports = router