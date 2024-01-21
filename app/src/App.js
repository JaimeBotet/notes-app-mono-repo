import React from "react"
import { Link, BrowserRouter, Route, Routes, redirect } from "react-router-dom"
import Notes from './Notes'
import Login from './Login'
import Logout from './components/Logout';
import { NoteDetail } from "./components/NoteDetail"
import { useUser } from './hooks/useUser'
import { useNotes } from './hooks/useNotes'

const Home = () => <h1>Home Page</h1>

const Users = () => <h1>Users</h1>

const inlineStyles = {
	padding: 5
}

const App = () => {
	const { user } = useUser()
	const { notes } = useNotes()

	return (
		<BrowserRouter>
			<header>
				<Link to='/' style={inlineStyles}>
					Home
				</Link>
				
				<Link to='/notes' style={inlineStyles}>
					Notes
				</Link>
				
				<Link to='/users' style={inlineStyles}>
					Users
				</Link>
				{
					user 
						? <Logout />
						: <Link to='/login' style={inlineStyles}>Login</Link>
				}
			</header>

			<Routes>
				<Route 
					path='/notes/:noteId' 
					element={<NoteDetail notes={notes} />}
				/>
				<Route path='/notes' element={<Notes />} />
				<Route path='/users' element={<Users />} />
				<Route path='/login' element={<Login />}/>
				<Route path='/' element={<Home />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App