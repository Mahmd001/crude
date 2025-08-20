const express = require('express')
const router = express.Router()

router.use('/userproduct',require('./userProduct.js'))
router.use('/product', require('./productRoute.js'))
router.use('/user', require('./userRoutes.js'))

module.exports = router