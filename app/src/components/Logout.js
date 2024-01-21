import React from 'react'
import { useUser } from '../hooks/useUser'

export default function Logout (props) {
	const { user, logout} = useUser()

	return (
		<span>
			<button onClick={() => logout()}>Logout</button>
		</span>
	)
}