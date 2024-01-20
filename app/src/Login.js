import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginFrom';
import { setToken} from './services/notes'
import { login } from './services/login'
import { useNavigate, redirect } from 'react-router-dom';


export default function Login(props){
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] 	= useState('')

	useEffect( () => {
		const loggedUserJson = localStorage.getItem('loggedNoteAppUser')
		if(loggedUserJson){
			const user = JSON.parse(loggedUserJson)
			setUser(user);
			setToken(user.token)
			redirect('/')
		}
	}, [])


	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await login({
				username,
				password
			})

			localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))

			setToken(user.token);
			setUser(user);
			setUsername('')
			setPassword('')
			navigate('/notes')
		} catch (e) {
			setErrorMessage('Wrong Credentials')
			setTimeout( () => {
				setErrorMessage('')
			}, 3000)
		}
	}

	console.log('User in Login: ')
	console.log(user)

	// if(user) return redirect("/")
	if(errorMessage) return <p>{errorMessage}</p>

	return (
		<LoginForm 
			username={username}
			password={password}
			handleUsernameChange={({target}) => setUsername(target.value)}
			handlePasswordChange={({target}) => setPassword(target.value)}
			handleSubmit={handleLogin}
		/>
	);
}