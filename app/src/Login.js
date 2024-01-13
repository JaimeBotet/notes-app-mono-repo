import React, { useState } from 'react';
import LoginForm from './components/LoginFrom';
import { setToken} from './services/notes'
import { login } from './services/login'
import { useNavigate } from 'react-router-dom';


export default function Login(props){
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] 	= useState('')

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

	if(errorMessage) return <p>{errorMessage}</p>

	if(user) return <p>User is logged!</p>

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