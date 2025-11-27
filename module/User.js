const mongoose = require('mongoose')
const brcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) { //this mean the document to will be saved isModified mean is it has been modified? **important**
        this.password = await brcrypt.hash(this.password, 8) //difficult lvl = 8 if more level more difficult but need more time to hash too and use much CPU performance
    }
    next() //if finsihed the function next will work to save the data to mongoDB
})

const User = mongoose.model('User', userSchema)
module.exports = User