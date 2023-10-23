const notesRouter = require('express').Router();
const Note = require('../models/Note');
const User = require('../models/User');

const authUser = require('../middlewares/authUser');

notesRouter.get('/', async (req, res) => {
	const notes = await Note.find({}).populate('user', {
		name: 1,
		username: 1
	});
	res.json(notes);

	// With Promise
	// Note.find({})
	// .then( (notes) => res.json(notes))
	// .catch( err => next(err))
})

notesRouter.post('/', authUser, async (req, res, next) => {
	const { 
		content, 
		important = false
	} = req.body

	const { userId } = req;

	const user = await User.findById(userId);

	if(!content){
		return res.status(400).json({
			error: 'Required "content" is missing!'
		})
	}

	const newNote = new Note({
		content,
		date: new Date(),
		important,
		user: user._id
	});

	try {
		const savedNote = await newNote.save();
		user.notes = [...user.notes, savedNote._id];
		await user.save();
		res.status(201).json(savedNote)
	} catch (error) {
		next(error)
	}

	// With Promise
	// newNote.save()
	// .then( savedNote => res.status(201).json(savedNote) )
	// .catch( err => next(err))
})

notesRouter.get('/:id', (req, res, next) => {
	const { id } = req.params;

	Note.findById(id)
	.then( note => note ? res.json(note) : res.status(404).end() )
	.catch( err => next(err) )
})

notesRouter.put('/:id', authUser, async (req, res, next) => {
	const { id } = req.params;
	const note = req.body;

	const newNoteInfo = {
		content: note.content,
		important: note.important
	}

	Note.findByIdAndUpdate(id, newNoteInfo, {new: true})
	.then( note => {
		res.json(note)
	})
	.catch( err => next(err) )
})

notesRouter.delete('/:id', authUser, async (req, res, next) => {
	const { id } = req.params;
	
	try {
		await Note.findByIdAndDelete(id)
		res.status(204).end()

	} catch(err) {
		next(err)
	}

	// With Promise
	// Note.findByIdAndDelete(id)
	// .then( () => res.status(204).end())
	// .catch( err => next(err) )
})

module.exports = notesRouter;