const express = require('express')
const router = express.Router()
const Product = require('../module/Product')
const upload = require('../middleware/uploads')
const auth = require('../middleware/auth')
const checkOwnership = require('../middleware/checkOwnership')

router.use(auth)
    // -------------
    // Create
    // -------------
    //Route 1: display form for create new product (using get method)
router.get('/new', (req, res) => {
    res.render('products/new-products')
})

//Route 2 : receive the infomation then create the new product (POST)
router.post('/', upload.single('productImage'), async(req, res) => {
    try {
        const newProduct = new Product({

            ...req.body,
            owner: req.user._id

        })
        if (req.file) {
            newProduct.imageUrl = `uploads/${req.file.filename}`
        }
        await newProduct.save() // save in database
        req.flash('success_msg', 'New Product created successfully')
        res.redirect('/products') //go back to product page
    } catch (error) {
        res.status(500).send('Cannot create a new product')
    }
})

// ---------------------
// Read 
// ---------------------

//Route 3: Display all product using get
router.get('/', async(req, res) => {
        try {
            const productsPerPage = 5
            const currentPage = parseInt(req.query.page) || 1 //read the page from url ex. localhost/products?page=2

            const [product, totalProducts] = await Promise.all([
                Product.find({ owner: req.user._id })
                .sort({ createAt: -1 }) //new to old
                .skip((productsPerPage * currentPage) - productsPerPage) //skip the product of previous page ex. 5*2 - 5 = 5(second page)
                .limit(productsPerPage),
                Product.countDocuments({ owner: req.user._id })
            ])
            const totalPages = Math.ceil(totalProducts / productsPerPage) //calculate total page

            res.render('products/index', {
                product: product,
                totalPages: totalPages,
                currentPage: currentPage,
                hasNextPage: currentPage < totalPages,
                hasPrevPage: currentPage > 1,
                nextPage: currentPage + 1,
                prevPage: currentPage - 1
            })

            const products = await Product.find({ owner: req.user._id }) //get all data from database
            res.render('products/index', { products: products })
        } catch (error) {
            console.error('Error fetching product', error)
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
router.get('/:id/edit', checkOwnership, async(req, res) => {
    try {
        const product = await Product.findById(req.params.id) //get the id by req parem to get only id
        res.render('products/edit-product', { product: product })
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
})

//Route 6: get the data from form then update using put
router.put('/:id', checkOwnership, upload.single('productImage'), async(req, res) => {
    try {
        const updateData = {...req.body }

        if (req.file) {
            updateData.imageUrl = `uploads/${req.file.filename}`
        }

        await Product.findByIdAndUpdate(req.params.id, updateData) //get the id by req parem to get only id
        res.redirect(`/products/${req.params.id}`)
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
})

//Route 7: Delete the product using delete
router.delete('/:id', checkOwnership, async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id) //get the id by req parem to get only id
        req.flash('success_msg', 'Product deleted successfully')
        res.redirect('/products')
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
})

module.exports = router