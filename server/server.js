const { api } = require('./api')
const { PORT } = require('./config')

// Start the server
api.listen(PORT, () => console.log(`File Uploader API Server is running on port ${PORT}`))
