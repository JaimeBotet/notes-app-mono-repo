import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const NO_OP = () => {}
export default function LoginForm ({ handleSubmit = NO_OP, handleUsernameChange, handlePasswordChange, username, password}) {
	return (
		<Togglable btnLabel='SHOW LOGIN'>
			<form data-test-id='login-form' onSubmit={handleSubmit}>
				<div>
					<input 
					type='text' 
					value={username}
					name='Username'
					placeholder='Username'
					onChange={handleUsernameChange}
					/>
				</div>

				<div>
					<input 
					type='password' 
					value={password}
					name='Password'
					placeholder='Password'
					onChange={handlePasswordChange}
					/>
				</div>

				<div>
					<button>Login</button>
				</div>
			</form>
		</Togglable>
	)
}

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
}