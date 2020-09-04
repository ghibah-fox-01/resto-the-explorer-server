const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication.js')
const RestoranController = require('../controllers/resto-controller.js')

<<<<<<< HEAD
router.use(authentication)
=======
router.get('/' , RestoranController.restoList)
>>>>>>> cdacfde78de5d5257a8f5de776d533ff1ded5f49

module.exports = router
