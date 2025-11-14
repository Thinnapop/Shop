const { name } = require('ejs')
const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema({
    name :{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const Product = mongoose.model('Product', productSchema)

module.exports = Product