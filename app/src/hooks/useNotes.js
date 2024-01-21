import {useEffect, useState} from "react"
import { getAll, create, update } from '../services/notes'

export const useNotes = () => {
	const [notes, setNotes] = useState([])
	const [errorMessage, setErrorMessage] 	= useState('')

	useEffect( () => {
		getAll()
		.then( initialNotes => {
			setNotes(initialNotes)
		})
	}, [])

	const addNote = (noteToAdd) => {
		setErrorMessage("")

		create(noteToAdd)
		.then( newNote => {
			setNotes( notes => [...notes, newNote])
		})
		.catch(error => {
			console.error(error),
			setErrorMessage("la API ha petado")
		})
	}

	const toggleImportanceOf = (id) => {
		const note = notes.find( n => n.id === id)
		const changedNote = { ...note, important: !note.important }

		return update(id, changedNote)
		.then(returnedNote => {
			setNotes(notes.map( note => note.id !== id ? note : returnedNote))
		})
	}

	return { notes, addNote, errorMessage, toggleImportanceOf }
}