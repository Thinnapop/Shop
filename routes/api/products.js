const express = require('express')
const router = express.Router()
const Product = require('../../module/Product')

// --- GET /api/product ---
router.get('/', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "Server error occured: ", error: error.message })
    }
})
module.exports = router