const ERROR_HANDLERS = {
	CastError: (res) => res.status(400).send({ error: 'id used is wrongly formed' }),
	ValidationError: (res, error) => res.status(424).send({ error: error.message }),
	JsonWebTokenError: (res, error) => res.status(401).send({ error: error.message }),
	
	defaultError: (res, error) => res.status(500).end()
}

module.exports = (error, req, res, next) => {
	console.log(error.name)

	const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
	handler(res, error);
}