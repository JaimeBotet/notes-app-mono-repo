
require('./utils/mongo');

const Sentry = require('@sentry/node') // Visit https://docs.sentry.io/platforms/javascript/  for Sentry docs
const Tracing = require('@sentry/tracing')
const express = require('express')
const cors = require('cors')
const { response } = require('express');

const {requestLogger, handleErrors, notFound} = require('./utils/middleware')

const notesRouter = require('./controllers/notesController')
const usersRouter = require('./controllers/usersController')
const loginRouter = require('./controllers/loginController')
// const example1Router = require('./controllers/example1')
// const example2Router = require('./controllers/example2')


const app = express()

// ENTRY MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('../app/build'))

Sentry.init({
	dsn: "https://86ccf42b164f4bf0b45c574aca80741c@o4504288794640384.ingest.sentry.io/4504288799948800",
	integrations: [
	  new Sentry.Integrations.Http({ tracing: true }),
	  new Tracing.Integrations.Express({ app }),
	],
	tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());


// CONTROLLERS 
app.get('/', (req, res) => {
	res.send('<h1>Hello World</h1>')
})

app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

if(process.env.NODE_ENV.trim() === 'test') {
	const testingRouter = require('./controllers/testingController')
	app.use('/api/testing', testingRouter )
}

// END MIDDLEWARES
app.use(notFound)

// ERROR MIDDLEWARES
app.use(handleErrors)

module.exports = app