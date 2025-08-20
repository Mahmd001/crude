const express = require('express')
const { create, fetchAll, fetchById, updateById, deleteById } = require('../Controllers/userproductController.js')
// const { fechAll } = require('../Controllers/productController.js')
const router = express.Router()

router.post('/',create)
router.get('/', fetchAll)
router.get('/get/:id', fetchById)
router.put('/put/:id', updateById)
router.delete('/delete/:id', deleteById)

module.exports = router