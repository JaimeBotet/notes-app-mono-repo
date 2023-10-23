const loginRouter = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../utils/config')

loginRouter.post('/', async (req, res, next) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });
	const passIsCorrect = user === null 
		? false
		: await bcrypt.compare(password, user.passwordHash);

	if(!passIsCorrect) {
		res.status(401).json({
			error: 'Invalid user or password'
		})
	}

	const userForToken = {
		id: user._id,
		username: user.username
	}

	const token = jwt.sign(userForToken, jwtSecret, { expiresIn: 60*60*24})
	
	res.send({
		name: user.name,
		username: user.username,
		token
	})
})

module.exports = loginRouter;