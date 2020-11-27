const cwd = require('cwd')
const fs = require('fs-extra')
const { v4 } = require('uuid')
const { DEFAULT_DIR } = require('../config')

// Required Services
const { uploadToCloudStorage, getZippedFilesFromStorage } = require('../services')

const uploadFiles = async (req, res) => {
	const files = req.files
	const id = v4()

	// Perform upload operation with service
	let result = await uploadToCloudStorage(id, files)

	// Interpret result
	if (result.success) {
		res.status(200).send({
			status : `Successfully uploaded selected files to cloud storage.`,
			id     : id
		})
	} else {
		res.status(500).send({
			status : `Failed to upload selected files to cloud storage. Reason: ${result.message}`,
			id     : 'FAILURE'
		})
	}
}

const downloadFiles = async (req, res) => {
	const { id } = req.shareID

	// Get zipped file and send to requester
	let result = await getZippedFilesFromStorage(id)
	if (result.success) {
		res.status(200).sendFile(result.path, (err) => {
			console.log(`Failed sending file to client. Reason: ${err}`)
		})
	} else {
		res.status(500).send({
			message : result.message
		})
	}
}

module.exports = {
	uploadFiles,
	downloadFiles
}
