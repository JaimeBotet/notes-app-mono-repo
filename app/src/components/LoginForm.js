import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';

const useField = ({type}) => {
	const [value, setValue] = useState('')
	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		setValue,
		onChange
	}
}

export default function LoginForm ({login}) {
	const navigate = useNavigate()
	const username = useField({type: 'text'})
	const password = useField({type: 'password'})
	const [errorMessage, setErrorMessage] 	= useState('')

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			login({username: username.value, password: password.value})

			username.setValue('')
			password.setValue('')
			navigate('/notes')
		} catch (e) {
			setErrorMessage('Wrong Credentials')
			setTimeout( () => {
				setErrorMessage('')
			}, 5000)
		}
	}

	if(errorMessage) return <p>{errorMessage}</p>

	return (
		<form onSubmit={handleLogin}>
			<div>
				<input 
					{...username}
					name='Username'
					placeholder='Username'
				/>
			</div>
			<div>
				<input 
					{...password}
					name='Password'
					placeholder='Password'
				/>
			</div>
			<div>
				<button>Login</button>
			</div>
		</form>
	)
}

// LoginForm.propTypes = {
// 	handleSubmit: PropTypes.func.isRequired
// }