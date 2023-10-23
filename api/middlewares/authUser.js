const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils/config');

module.exports = (req, res, next) => {
	const auth = req.get('authorization');
	let token = '';

	if(auth && auth.toLocaleLowerCase().startsWith('bearer')) token = auth.substring(7);

	const decodedToken = jwt.verify(token, jwtSecret, (err, decoded) => err ?? decoded);

	if(!token || !decodedToken?.id) return res.status(401).json({error: 'token missing or invalid'})

	const { id: userId } = decodedToken; 

	req.userId = userId;

	next();
}