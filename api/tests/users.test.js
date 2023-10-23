const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { api, getUsers } = require('./helpers')


describe('Users test suite' , () => {
	// prepare tests
	beforeEach( async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('pswd',10)
		const user = new User({ username: "jaimeroot", name: "Jaime Root", passwordHash})

		await user.save()
	})

	test('creating a new user works as expected ', async () => {
		const usersAtStart = await getUsers()

		const newUser = {
			username: 'midudev',
			name: 'Miguel Duran',
			password: 'twitch'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		const usersAtEnd = await getUsers()

		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map( u => u.username )
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper status code and message if username is already taken', async () => {
		const usersAtStart = await getUsers();

		const newUser = { 
			username: "jaimeroot",
			name: "Jaime Root",
			password: 'pwdtest'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.errors.username.message).toContain('`username` to be unique')

		const usersAtEnd = await getUsers()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('users are returned as jason', async () => {
		await api
			.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	

	// Clean Up
	afterAll( () => {
		mongoose.disconnect()
	})
})


