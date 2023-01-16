const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const apiController = require('../controllers/api')

router.post('/login', authController.postLogin)
router.post('/logout', authController.logout)
router.post('/signup', authController.postSignup)

router.get('/check', apiController.checkUser)

module.exports = router