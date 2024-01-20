import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function LoginForm ({ handleSubmit, ...props}) {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<input 
					type='text'
					value={props.username}
					name='Username'
					placeholder='Username'
					onChange={props.handleUsernameChange}
				/>
			</div>
			<div>
				<input 
					type='password' 
					value={props.password}
					name='Password'
					placeholder='Password'
					onChange={props.handlePasswordChange}
				/>
			</div>
			<div>
				<button>Login</button>
			</div>
		</form>
	)
}

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
}