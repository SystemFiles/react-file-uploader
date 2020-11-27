const fs = require('fs-extra')
const archiver = require('archiver')
const { DEFAULT_DIR } = require('../config')

const archiveDirectory = (id) => {
	let output = fs.createWriteStream(`${DEFAULT_DIR}/${id}.zip`)
	let archive = archiver('zip')

	output.on('close', () => {
		console.log(archive.pointer() + ' total bytes ')
		return {
			success : true,
			message : 'File successfully zipped!',
			zipPath : `${DEFAULT_DIR}/${id}.zip`
		}
	})

	archive.on('error', (err) => {
		return {
			success : false,
			message : `Error trying to zip files on server. Reason: ${err}`
		}
	})
	archive.pipe(output)

	archive.directory(`${DEFAULT_DIR}/${id}`, false)
	archive.finalize()
}

module.exports = {
	archiveDirectory
}

// So gareth and nathan get to decide when the change happens?? Just when it is convienient for them? Well its conveinient for me right now.
