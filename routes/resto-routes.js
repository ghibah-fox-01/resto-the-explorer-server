const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication.js')
const RestoranController = require('../controllers/resto-controller.js')

router.use(authentication)

module.exports = router
