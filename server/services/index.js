const fs = require('fs-extra')
const { DEFAULT_DIR } = require('../config')
const { archiveDirectory } = require('../utils')

// services
const uploadToCloudStorage = async (id, files) => {
	try {
		await fs.mkdirp(`${DEFAULT_DIR}/${id}`)
	} catch (err) {
		return {
			success : false,
			message : `Failed to upload files. Reason: ${err}`
		}
	}

	// Move all files to created directory
	try {
		for await (const file of files) {
			await fs.move(
				`${DEFAULT_DIR}/${file.filename}`,
				`${DEFAULT_DIR}/${id}/${file.filename}`,
				{
					overwrite : false
				},
				(err) => {
					return {
						success : false,
						message : `Failed to upload files. Reason: ${err}`
					}
				}
			)
		}

		console.log(`Successfully uploaded files with ID: ${id}`)
		return {
			success : true,
			message : 'Files successfully uploaded to proper location.'
		}
	} catch (err) {
		return {
			success : false,
			message : `Failed to move files to the proper location. Reason: ${err}`
		}
	}
}

const getZippedFilesFromStorage = async (id) => {
	let zippedRes = await archiveDirectory(id)

	if (zippedRes.success) {
		return {
			success : true,
			message : 'Success!',
			path    : zippedRes.zipPath
		}
	} else {
		return {
			success : false,
			message : `Failed to get files from storage for download. Reason: ${zippedRes.message}`
		}
	}
}

module.exports = {
	uploadToCloudStorage,
	getZippedFilesFromStorage
}
