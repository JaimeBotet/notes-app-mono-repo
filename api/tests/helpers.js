const supertest = require('supertest')
const app = require('../app')
const api = supertest(app);
const User = require('../models/User');

const iniNotes = [
	{
		content: 'Atlas mola mucho',
		important: true,
		date: new Date()
	},
	{
		content: 'Y Mongo tambien!',
		important: false,
		date: new Date()
	}
]

const iniUsers = [
	{
		username: "ppaellas",
		name: "Pepe Paellas",
		password: "123test"
	},
	{
		username: "ppistolas",
		name: "Pepe Pistolas",
		password: "123test"
	}
]

const getAllContentFromNotes = async () => {
	const response = await api.get('/api/notes')
	return {
		contents: response.body.map( note => note.content),
		response
	}
}

const getUsers = async () => {
	const users = await User.find({});
	return users.map( user => user.toJSON())
}

module.exports = { 
	iniNotes,
	iniUsers,
	api,
	getAllContentFromNotes,
	getUsers
}