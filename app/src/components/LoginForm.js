import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'

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

		console.log("loggin in")
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
		<Form onSubmit={handleLogin}>
			<Form.Group id='uisername'>
				<Form.Control 
					{...username}
					name='Username'
					placeholder='Username'
				/>
			</Form.Group>
			<Form.Group id='password'>
				<Form.Control 
					{...password}
					name='Password'
					placeholder='Password'
				/>
			</Form.Group>
			<Button id='from-login-button' type='submit'>
				Login
			</Button>
		</Form>
	)
}

// LoginForm.propTypes = {
// 	handleSubmit: PropTypes.func.isRequired
// }