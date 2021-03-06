require('dotenv').config()
const express = require('express')
const port = process.env.PORT
const app = express()
const routes = require('./routes/index.js')
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
