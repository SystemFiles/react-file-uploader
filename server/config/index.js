const dotenv = require('dotenv')
dotenv.config()

module.exports = {
	PORT                : process.env.PORT || 5000,
	DEFAULT_DIR         : process.env.DEFAULT_DIR || '/media/files',
	RANDOMIZE_FILENAMES : process.env.RANDOMIZE_FILENAMES,
	ZIP_MULTI_FILE      : process.env.ZIP_MULTI_FILE,
	SHARE_ENABLED       : process.env.SHARE_ENABLED,
	MAX_FILES           : process.env.MAX_FILES || 6,
	MAX_SIZE_MB         : process.env.MAX_SIZE_MB || 5
}
