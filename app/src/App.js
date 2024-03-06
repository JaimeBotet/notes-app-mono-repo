import React, {useState} from "react"
import { Link, BrowserRouter, Route, Routes, redirect } from "react-router-dom"
import Notes from './Notes'
import Login from './Login'
import { NoteDetail } from "./components/NoteDetail"
import { useUser } from './hooks/useUser'
import { useNotes } from './hooks/useNotes'
import { Nav, Navbar } from "react-bootstrap";

const Home = () => <h1>Home Page</h1>
const Users = () => <h1>Users</h1>

const inlineStyles = {
	padding: 5
}

const App = () => {
	const [user, setUser] = useState()
	const { logout, login } = useUser(user, setUser)
	const { notes } = useNotes()

	return (
		<BrowserRouter>
			<div className="container">
				<Navbar collapseOnSelect expand='lg'>
					<Navbar.Toggle aria-controls="responsive-narvbar-nav" />

					<Navbar.Collapse>
						<Nav>
							<Link to='/' style={inlineStyles}>
								<Nav.Link as="div">
										Home
								</Nav.Link>
							</Link>
							
							<Link to='/notes' style={inlineStyles}>
								<Nav.Link as="div">
										Notes
								</Nav.Link>
							</Link>

							<Link to='/users' style={inlineStyles}>
								<Nav.Link as="div">
										Users
								</Nav.Link>
							</Link>

							{
								user 
									? <Link onClick={() => logout()} style={inlineStyles}><Nav.Link as="div">Logout</Nav.Link></Link>
									: <Link to='/login' style={inlineStyles}><Nav.Link as="div">Login</Nav.Link></Link>
							}

						</Nav>
					</Navbar.Collapse>
				</Navbar>

				<Routes>
					<Route 
						path='/notes/:noteId' 
						element={<NoteDetail notes={notes} />}
					/>
					<Route path='/notes' element={<Notes user={user}/>} />
					<Route path='/users' element={<Users />} />
					<Route path='/login' element={<Login login={login}/>} />
					<Route path='/' element={<Home />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App