const express = require('express')
const { create, fechAll, fechById, update, deleteProduct,  } = require('../Controllers/productController.js')
const route = express.Router()

route.post('/', create)
route.get('/', fechAll)
route.get('/product/:id', fechById)
route.put('/:id', update)
route.delete('/:id', deleteProduct)

module.exports = route;