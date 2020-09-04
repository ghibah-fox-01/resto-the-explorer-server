const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication.js')

router.use(authentication)


module.exports = router
