const express = require('express')
const router = express.Router()


const restoRoutes = require('./resto-routes')
const userRoutes = require('./user-routes.js')
const favRoutes = require('./fav-routes.js')

router.use('/resto' , restoRoutes)
router.use('/user',userRoutes)
router.use('/fav',favRoutes)

module.exports = router
