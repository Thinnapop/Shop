const Product = require('../module/Product')

const checkOwnership = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).send('Product not found')
        }
        //_id refer to the user that login in website
        if (!product.owner.equals(req.user._id)) {
            console.log('Authorization failed user are no the owner')
            return res.redirect('/products')
        }

        next()

    } catch (error) {
        console.error(error)
        return res.status(500).send('Server error')
    }
}
module.exports = checkOwnership