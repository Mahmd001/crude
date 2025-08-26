const express = require('express')
const { register, login, logout, fetchAll, fetchById, updateUser, deleteUser, sendOtpToken, verifiedOtp, isAuthenticate, sendResetOtp, resetPassword } = require('../Controllers/authController')
const { authmiddlewere } = require('../middlewere/authMiddlewere')

const router = express.Router()


router.post('/', register)
router.post('/login', login)
router.post('/logout', logout )
router.post('/sendotp', authmiddlewere, sendOtpToken)
router.post('/verifyotp', authmiddlewere, verifiedOtp)
router.get('/is-auth', authmiddlewere, isAuthenticate)
router.post('/send-reset-otp',  sendResetOtp)
router.post('/reset-password',  resetPassword)
router.get('/', fetchAll)
router.get('/get/:id', fetchById)

router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
module.exports =router