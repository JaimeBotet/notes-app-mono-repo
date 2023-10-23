import React, {useState, useRef} from 'react'
import Togglable from './Togglable'

export default function NoteForm ({ addNote }) {
	
	const [newNote, setNewNote] = useState('')

	const togglableRef = useRef();

	const handleSubmit = (event) => {
		event.preventDefault()
		
		const noteToAdd = {
			content: newNote,
			important: Math.random() > 0.5
		}

		addNote(noteToAdd);
		setNewNote('')
		togglableRef.current.toggleVisibility()
	}

	const handleChange = (event) => {
		setNewNote(event.target.value)
	}
	return (
		<Togglable  btnLabel='New Note' ref={togglableRef}>
			<h3>Create a new note</h3>

			<form data-test-id="note-form" onSubmit={handleSubmit}>
				<input 
					type="text" 
					onChange={handleChange} 
					value={newNote}
					placeholder="Note content..."
				/>
				<button>Save</button>
			</form>
		</Togglable>
	)
}
