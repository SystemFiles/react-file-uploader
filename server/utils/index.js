const archiver = require('archiver-promise')
const { DEFAULT_DIR } = require('../config')

const archiveDirectory = async (id) => {
	let timestamp = Date.now()
	let output = `${DEFAULT_DIR}/${id}-${timestamp}.zip`
	let archive = archiver(output, {
		store : true
	})

	try {
		archive.directory(`${DEFAULT_DIR}/${id}`, false)
		await archive.finalize()

		console.log(`Archive completed for ID: ${id}`)
		return {
			success : true,
			message : 'File successfully zipped!',
			zipPath : `${DEFAULT_DIR}/${id}-${timestamp}.zip`
		}
	} catch (err) {
		return {
			success : false,
			message : `Error trying to zip files on server. Reason: ${err}`
		}
	}
}

module.exports = {
	archiveDirectory
}
