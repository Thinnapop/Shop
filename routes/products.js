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
    //Route 4: Display single product using get
router.get('/:id', async(req, res) => {
        try {
            const product = await Product.findById(req.params.id) //get the id by req parem to get only id
            res.render('products/show-detail', { product: product })
        } catch (error) {
            res.status(500).send('Something went wrong')
        }
    })
    // -------------
    // Update 
    // -------------

//Route 5: Display the form for modify the products using get
router.get('/:id/edit', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id) //get the id by req parem to get only id
        res.render('products/edit-product', { product: product })
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
})

//Route 6: get the data from form then update using put
router.put('/:id', async(req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body) //get the id by req parem to get only id
        res.redirect(`/products/${req.params.id}`)
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
})

//Route 7: Delete the product using delete
router.delete('/:id', async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id) //get the id by req parem to get only id
        res.redirect('/products')
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
})

module.exports = router