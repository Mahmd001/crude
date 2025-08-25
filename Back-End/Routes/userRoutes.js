const express = require('express')
const { create, fetchAll, fetchById, Update, deleteById } = require('../Controllers/userControllers.js')
const { Getuser } = require('../Controllers/userdetailsController.js')
const { authmiddlewere } = require('../middlewere/authMiddlewere.js')
const router = express.Router()

router.post('/', create)
router.get('/', fetchAll)
router.get('/data',authmiddlewere, Getuser)
router.put('/update/:id', Update)
router.delete('/delete/:id', deleteById)

module.exports = router