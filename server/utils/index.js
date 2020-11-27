const fs = require('fs-extra')
const archiver = require('archiver')
const { DEFAULT_DIR } = require('../config')

const archiveDirectory = (id, directory) => {
	let output = fs.createWriteStream(`${DEFAULT_DIR}/${id}.zip`)
	let archive = archiver('zip')

	output.on('close', () => {
		console.log(archive.pointer() + ' total bytes ')
		console.log('Done.')
	})

	archive.on('error', (err) => {
		return {
			success : false,
			message : `Error trying to zip files on server. Reason: ${err}`
		}
	})
	archive.pipe(output)

	archive.directory(`${DEFAULT_DIR}/${id}/`, false)
	archive.finalize()
}
