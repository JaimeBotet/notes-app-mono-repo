import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginFrom';
import { useNavigate, redirect } from 'react-router-dom';
import { useUser } from './hooks/useUser'

export default function Login(props){
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const { user, login } = useUser()
	const [errorMessage, setErrorMessage] 	= useState('')

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			login({username, password})

			setUsername('')
			setPassword('')
			navigate('/notes')
		} catch (e) {
			setErrorMessage('Wrong Credentials')
			setTimeout( () => {
				setErrorMessage('')
			}, 5000)
		}
	}

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