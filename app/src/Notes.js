import Note from './components/Note'
import { useState, useEffect } from 'react';
import { getAll, create, setToken} from './services/notes'
import { login } from './services/login'
import LoginForm from './components/LoginFrom';
import NoteForm from './components/NoteForm';
import Logout from './components/Logout';
import Notification from './components/Notification';


const Notes = (props) => {
	const [notes, setNotes] = useState([])
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] 	= useState('')
	const [user, setUser] = useState(null)
	
	useEffect( () => {
		setLoading(true)
		getAll()
		.then( notes => {
			console.log(notes)
			setNotes(notes)
			setLoading(false)
		})
	}, [])
	
	useEffect( () => {
		const loggedUserJson = localStorage.getItem('loggedNoteAppUser')
		if(loggedUserJson){
			const user = JSON.parse(loggedUserJson)
			setUser(user);
			setToken(user.token)
		}
	}, [])

	const addNote = (noteToAdd) => {
		setErrorMessage("")

		create(noteToAdd)
		.then( newNote => {
			setNotes( prevNotes => [...prevNotes, newNote])
		})
		.catch(error => {
			console.error(error)
			setErrorMessage("la API ha petado")
		})
	}

	return (
		<div>
			<h1>Notes: Desde la APP</h1>

			<Notification message={errorMessage} />

			{ user ? <NoteForm addNote={addNote} /> : ""}

			{loading ? 'Cargando...' : ""}

			<ol>
				{notes.map( note => 
					<Note 
						key={note.id} 
						{...note} 
					/>
				)}
			</ol>
		</div>
	);
}

export default Notes;
