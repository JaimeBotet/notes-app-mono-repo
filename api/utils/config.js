require('dotenv').config()

const PORT = process.env.PORT || 5000
const jwtSecret = process.env.JWT_SECRET
const connectionString = process.env.NODE_ENV.trim() === 'test' // trim() to delete white spaces
? process.env.MONGO_DB_URI_TEST 
: process.env.MONGO_DB_URI

module.exports = {
	connectionString,
	PORT,
	jwtSecret
}