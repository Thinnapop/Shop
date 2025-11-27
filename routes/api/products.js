const express = require('express')
const router = express.Router()
const Product = require('../../module/Product')
const upload = require('../../middleware/uploads')
    // --- GET /api/product ---
router.get('/', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "Server error occured: ", error: error.message })
    }
})

// --- GET /api/product/:id ---
router.get('/:id', async(req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        if (!products) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "Server error occured: ", error: error.message })
    }
})

// --- POST /api/products/ ---
router.post('/', upload.single('productImage'), async(req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price
        })

        if (req.file) {
            newProduct.imageUrl = `uploads/${req.file.filename}`
        }

        const saveProduct = await newProduct.save()
        res.status(201).json(saveProduct)

    } catch (error) {
        res.status(500).json({ message: "Invalid data submitted", error: error.message })
    }
})

// --- PUT /api/products/:id ---
router.put('/:id', upload.single('productImage'), async(req, res) => {
    try { //send back new data
        const updateData = {...req.body }

        if (req.file) {
            updateData.imageUrl = `uploads/${req.file.filename}`
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true })

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: "Invalid data for update", error: error.message })
    }
})

// --- PUT /api/products/:id ---
router.delete('/:id', async(req, res) => {
    try { //send back new data
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)

        if (!deleteProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server bad respond", error: error.message })
    }
})

module.exports = router