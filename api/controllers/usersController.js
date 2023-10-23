const usersRouter = require('express').Router()
const User = require('../models/User')
const Note = require('../models/Note')
const bcrypt = require('bcrypt')


usersRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('notes', {
		content: 1,
		date: 1
	});
	res.json(users);
})

usersRouter.post('/', async (req, res, next) => {
	const { username, name, password } = req.body

	if(!username || !name || !password){
		return res.status(400).json({
			error: 'Fields are missing!'
		})
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash
	})

	try {
		const savedUser = await user.save();
		res.status(201).json(savedUser);
	} catch (error) {
		res.status(400).json(error)
	}
})

usersRouter.get('/:id', (req, res, next) => {
	const { id } = req.params;

	User.findById(id)
	.then( user => user ? res.json(user) : res.status(404).end() )
	.catch( err => next(err) )
})

usersRouter.put('/:id', (req, res, next) => {
	const { id } = req.params;
	const user = req.body;

	const newUserInfo = {
		content: user.content,
		important: user.important
	}

	User.findByIdAndUpdate(id, newUserInfo, {new: true})
	.then( user => {
		res.json(user)
	})
	.catch( err => next(err) )
})

usersRouter.delete('/:id', async (req, res, next) => {
	const { id } = req.params;
	
	try {
		await User.findByIdAndDelete(id)
		res.status(204).end()

	} catch(err) {
		next(err)
	}

	// With Promise
	// User.findByIdAndDelete(id)
	// .then( () => res.status(204).end())
	// .catch( err => next(err) )
})

module.exports = usersRouter;