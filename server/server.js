const fs = require('fs-extra')
const { api } = require('./api')
const { PORT, DEFAULT_DIR, CLEAN_DIR_INTERVAL, CLEAN_ENABLED } = require('./config')

// Initiated auto remove service
if (CLEAN_ENABLED) {
	console.log(`Initiated a clean scheduled job on this process. Will run every ${CLEAN_DIR_INTERVAL} days!`)
	setInterval(() => {
		try {
			fs.emptyDirSync(`${DEFAULT_DIR}/`)
		} catch (err) {
			console.log(`Error trying to clean directory. Reason: ${err}`)
		}
	}, CLEAN_DIR_INTERVAL * 24 * 60 * 60 * 1000)
} else {
	console.log('No data directory cleanup enabled')
}

// Start the server
api.listen(PORT, () => console.log(`File Uploader API Server is running on port ${PORT}`))
