const jwt = require('jsonwebtoken')
const User = require('../module/User')

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.redirect('/auth/login')
        }
        //important for auth
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id }) //find the user in database

        if (!user) {
            throw new Error()

        }
        req.user = user
        res.locals.user = user //make it golbal to access in any files
        next()

    } catch (error) {
        res.redirect('/auth/login')
    }
}
module.exports = auth