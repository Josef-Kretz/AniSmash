const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const apiController = require('../controllers/api')
const mainController = require('../controllers/main')

router.post('/login', authController.postLogin)
router.post('/logout', authController.logout)
router.post('/signup', authController.postSignup)

router.post('/like', mainController.addLike)
router.post('/hate', mainController.hate)

router.get('/getProfile', mainController.getProfile)

router.delete('/eraseLikes', mainController.eraseLikes)
router.delete('/eraseNotLikes', mainController.eraseNotLikes)
router.delete('/deleteUser', mainController.deleteUser)

router.get('/check', apiController.checkUser)

module.exports = router