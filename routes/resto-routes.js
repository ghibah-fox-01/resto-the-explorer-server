const express = require('express')
const router = express.Router()
const RestoranController = require('../controllers/resto-controller.js')

router.get('/' , RestoranController.restoList)

module.exports = router
