// Aqui pondremos el middleware de:
// notFound
const notFound = (req, res, next) => {
	res.status(404).json({
		error: 'Not found'
	});
}

// handleErrors
const handleErrors = (err, req, res, next) => {
	console.error(err)

	if (err.name === 'CastError'){
		res.status(400).send({
			error: 'id used is wrongly formed'
		})
	} else {
		res.status(500).end()
	}
}

// reqLogger
const requestLogger = (req, res, next) => {
	console.log(req.method)
	console.log(req.path)
	console.log(req.body)
	console.log('--------')
	next()
}

module.exports = {notFound, handleErrors,requestLogger}