const express = require('express')
const { create, fetchAll, fetchById, Update, deleteById } = require('../Controllers/userControllers.js')
const router = express.Router()

router.post('/user', create)
router.get('/users', fetchAll)
router.get('/user/:id', fetchById)
router.put('/update/:id', Update)
router.delete('/delete/:id', deleteById)

module.exports = router