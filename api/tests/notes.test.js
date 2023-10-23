const mongoose = require('mongoose');
const Note = require('../models/Note');
const { iniNotes, api, getAllContentFromNotes } = require('./helpers')



describe('notes test suite' , () => {
	// prepare tests
	beforeEach( async () => {
		await Note.deleteMany({});

		// parallel -> fastest but less controlled
		// const notes = iniNotes.map( note => new Note(note))
		// await Promise.all( notes.map( note => note.save()))

		// sequential -> we control the order of creation
		for (let note of iniNotes){
			const noteObject = new Note(note);
			await noteObject.save()
		}
	})

	test('notes are returned as json', async () => {
		await api
			.get('/api/notes')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('there are two notes', async () => {
		const { contents } = await getAllContentFromNotes()
		expect(contents).toHaveLength(iniNotes.length)

	})

	test('one note contains Atlas', async () => {
		const { contents } = await getAllContentFromNotes()
		expect(contents).toContain('Atlas mola mucho')
	})

	test('a valid note can be added', async () => {
		const newNote = {
			content: "Proximamente async/await",
			important: true
		};

		await api
			.post('/api/notes')
			.send(newNote)
			.expect(201)
			.expect('Content-Type', /application\/json/)
			
		const { contents } = await getAllContentFromNotes()
		expect(contents).toContain("Proximamente async/await")
		expect(contents).toHaveLength(iniNotes.length + 1)
	})

	test('an invalid note cannot be added', async () => {
		const newNote = {
			important: true
		};

		await api
			.post('/api/notes')
			.send(newNote)
			.expect(400)
			.expect('Content-Type', /application\/json/)
			
		const { contents } = await getAllContentFromNotes()
		expect(contents).toHaveLength(iniNotes.length )
	})

	test('A note can be deleted', async () => {
		const { response: firstResponse } = await getAllContentFromNotes();
		const { body: notes } = firstResponse;
		const noteToDelete = notes[0]
		
		await api
			.delete(`/api/notes/${noteToDelete.id}`)
			.expect(204)

		const { contents, response: secondResponse } = await getAllContentFromNotes();
		expect(secondResponse.body).toHaveLength(iniNotes.length -1)

		expect(contents).not.toContain(noteToDelete.content)
	})

	test('A note that doesnt exist cannot be deleted', async () => {
		await api
			.delete(`/api/notes/1234`)
			.expect(400)

		const { contents } = await getAllContentFromNotes();
		expect(contents).toHaveLength(iniNotes.length)
	})

	// Clean Up
	afterAll( () => {
		mongoose.disconnect()
	})
})

