const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  PORT                : process.env.PORT || 5000,
  DEFAULT_DIR         : process.env.DEFAULT_DIR || '/media/files',
  MAX_FILES           : process.env.MAX_FILES || 6,
  MAX_SIZE_MB         : process.env.MAX_SIZE_MB || 2048,
  // Clean directory on interval (days)
  CLEAN_ENABLED       : process.env.CLEAN_ENABLED || false,
  CLEAN_DIR_INTERVAL  : process.env.CLEAN_DIR_INTERVAL || 7
}
