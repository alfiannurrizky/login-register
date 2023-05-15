const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('./routes/index')

require('dotenv').config()

app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('combined'))
app.use(cors())
app.use(router)

app.listen(process.env.PORT, () => {console.log(`server running on port ${process.env.PORT}`)})