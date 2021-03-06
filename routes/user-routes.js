const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user-controller.js')

router.post(`/register`, UserController.postRegister)
router.post(`/login`, UserController.postLogin)
router.post('/tokensignin', UserController.googleLoginHandler)

module.exports = router
