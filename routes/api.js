const express = require('express')
const router = express.Router()
const apiController = require('../controllers/api')

router.get('/trailer', apiController.getTrailer)
router.get('/rec', apiController.rec)
router.get('/trending', apiController.trending)

module.exports = router