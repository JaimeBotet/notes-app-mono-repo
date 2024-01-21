import {useEffect, useState} from "react"
import { setToken } from '../services/notes'
import {login as loginService } from '../services/login'

export const useUser = () => {
	const [user, setUser] = useState(null)

	useEffect( () => {
		const loggedUserJson = localStorage.getItem('loggedNoteAppUser')
		if(loggedUserJson){
			const user = JSON.parse(loggedUserJson)
			setUser(user);
			setToken(user.token)
		}
	}, [])

	const login = async ({ username, password}) => {
		const user = await loginService({
			username,
			password
		})
		localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
		setToken(user.token);
		setUser(user);
	}

	const logout = () => {
		setToken(null)
		setUser(null)
		localStorage.removeItem('loggedNoteAppUser')
	}

	return {user, logout, login}
}