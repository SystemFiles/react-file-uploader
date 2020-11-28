const rateLimit = require('express-rate-limit')
const multer = require('multer')
const { DEFAULT_DIR, MAX_SIZE_MB } = require('../config')

// Create storage on device
const storage = multer.diskStorage({
	destination : (req, file, cb) => {
		cb(null, `${DEFAULT_DIR}/`)
	},
	filename    : (req, file, cb) => {
		cb(null, file.originalname)
	}
})

module.exports = {
	uploadLimit   : rateLimit({
		windowMs : 24 * 60 * 60 * 1000,
		max      : 200, // Modify for prod
		message  : 'You have exceeded the maximum number of uploads in 24hrs...',
		headers  : true
	}),
	downloadLimit : rateLimit({
		windowMs : 24 * 60 * 60 * 1000,
		max      : 1000,
		message  : 'You have exceeded the maximum number of downloads in 24hrs...',
		headers  : true
	}),
	uploader      : multer({
		storage : storage,
		limits  : {
			fileSize  : MAX_SIZE_MB * 1000 * 1000,
			fieldSize : MAX_SIZE_MB * 1000 * 1000
		}
	})
}
