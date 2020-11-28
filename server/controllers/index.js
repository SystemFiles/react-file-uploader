const { v4 } = require('uuid')
const fs = require('fs-extra')

// Required Services
const { uploadToCloudStorage, getZippedFilesFromStorage } = require('../services')

const uploadFiles = async (req, res) => {
	const files = req.files
	const id = v4()

	console.log(files)

	try {
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
	} catch (err) {
		console.log(`Unknown Error: ${err}`)
		res.status(500).send({
			message : `Failed to upload files. Reason: ${err}`
		})
	}
}

const downloadFiles = async (req, res) => {
	const { id } = req.params
	try {
		// Get zipped file and send to requester
		let result = await getZippedFilesFromStorage(id)
		if (result.success) {
			console.log(`Sent file with ID: ${id}, successfully!`)
			console.log(`Sending file: ${result.path}`)
			res.status(200).sendFile(result.path)

			// Delete the file after sending
			await fs.remove(result.path)
		} else {
			res.status(500).send({
				message : result.message
			})
		}
	} catch (err) {
		console.log(`Unknown Error: ${err}`)
		res.status(500).send({
			message : `Failed to get files. Reason: ${err}`
		})
	}
}

module.exports = {
	uploadFiles,
	downloadFiles
}
