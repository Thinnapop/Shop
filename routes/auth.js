const express = require('express')
const router = express.Router()
const User = require('../module/User')
const brcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async(req, res) => {
    try {
        const { username, password } = req.body
        const user = new User({ username, password })
        await user.save()
        res.redirect('/auth/login')
    } catch (error) {
        res.status(400).send('Error registering user. . .')
    }
})

router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(400).send('Invalid login credentials.')
        }
        const isMatch = await brcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).send('Invalid login credentials.')
        }

        const token = jwt.sign({ _id: user._id.toString() }, //store only id cause it เพัยงพอ to find a user 
            process.env.JWT_SECRET, { expiresIn: '1h' }
        )

        res.cookie('token', token, {
            httpOnly: true //prevent the JS from client side
        })

        res.redirect('/products')

    } catch (error) {
        res.status(500).send('Server error.')
    }
})
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = router