const express = require('express')
const { create, fechAll, fechById, update, deleteProduct,  } = require('../Controllers/productController.js')
const route = express.Router()

route.post('/product', create)
route.get('/products', fechAll)
route.get('/product/:id', fechById)
route.put('/productupdate/:id', update)
route.delete('/productdelete/:id', deleteProduct)

module.exports = route;