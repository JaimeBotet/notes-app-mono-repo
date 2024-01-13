import React from "react"
import { Link, BrowserRouter, Route, Routes } from "react-router-dom"
import Notes from './Notes'

const Home = () => <h1>Home Page</h1>

const Users = () => <h1>Users</h1>

const inlineStyles = {
	padding: 5
}

const App = () => {
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
			</header>

			<Routes>
				<Route 
					path='/notes/:id' 
					element={(
						<h1>Sigle note: </h1>
					)}
				/>

				<Route path='/notes' element={<Notes />} />
				<Route path='/users' element={<Users />} />
				<Route path='/' element={<Home />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App