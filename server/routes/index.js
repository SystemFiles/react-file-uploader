const express = require('express')
const router = express.Router()
const { MAX_FILES } = require('../config')
const { uploader } = require('../middleware')

// controllers
const { uploadFiles, downloadFiles } = require('../controllers')

// routes
router.get('/files/:id', downloadFiles)
router.get('', (req, res) => {
	res.status(200).send('You have reached the root API endpoint...')
})
router.post('/files', uploader.array('fileField', MAX_FILES), uploadFiles)

module.exports = router
