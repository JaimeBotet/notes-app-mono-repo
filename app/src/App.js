import './App.css';
import Note from './components/Note'
import { useState, useEffect } from 'react';
import { getAll, create, setToken} from './services/notes'
import { login } from './services/login'
import LoginForm from './components/LoginFrom';
import NoteForm from './components/NoteForm';
import Logout from './components/Logout';
import Notification from './components/Notification';


const App = (props) => {
	const [notes, setNotes] = useState([])
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] 	= useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
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

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log(username,password)
		try {
			const user = await login({
				username,
				password
			})

			localStorage.setItem(
				'loggedNoteAppUser', JSON.stringify(user)
			)

			setToken(user.token);
			setUser(user);
			setUsername('')
			setPassword('')
		} catch (err) {
			setErrorMessage('Wrong Credentials')
			setTimeout( () => {
				setErrorMessage('')
			}, 3000)
		}
	}

	const handleLogout = () => {
		setToken(null)
		setUser(null)
		localStorage.removeItem('loggedNoteAppUser')
	}

	return (
		<div>
			<h1>Notes</h1>

			<Notification message={errorMessage} />

			{
				user
					? <>
						<NoteForm addNote={addNote} />
						<br/>
						<Logout handleLogout={handleLogout} />
					</>

					: <LoginForm 
						username={username}
						password={password}
						handleUsernameChange={({target}) => setUsername(target.value)}
						handlePasswordChange={({target}) => setPassword(target.value)}
						handleSubmit={handleLogin}
						/>
			}

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

export default App;
