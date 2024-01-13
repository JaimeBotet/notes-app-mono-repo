import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"
import { getAll, create, setToken} from '../services/notes'

export default function Logout (props) {
	const navigate = useNavigate()
	const [user, setUser] = useState(null)

	const handleLogout = () => {
		setToken(null)
		setUser(null)
		localStorage.removeItem('loggedNoteAppUser')
		navigate('/login')
	}

	return (
		<span>
			<button onClick={handleLogout}>Logout</button>
		</span>
	)
}