const mongoose = require('mongoose')
const { connectionString } = require('./config')
const logger = require('./logger')

logger.info('Connecting to ', connectionString)

// conection to MongoDB
mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then( () => console.log('Database connected'))
	.catch( err => console.error(err))

process.on('uncaughtException', error => {
	console.log(error);
	mongoose.disconnect()
})