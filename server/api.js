const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// setup
const api = express()
const routes = require('./routes')

// configure
api.set('trust proxy', 1)
api.use(cors())
api.use(bodyParser.urlencoded({ extended: true }))
api.use(bodyParser.json())

// routes
api.use('/api', routes)

module.exports = {
	api
}
