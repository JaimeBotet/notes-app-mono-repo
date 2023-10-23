import React from 'react'

export default function Logout ({ handleLogout}) {
		
	return (
	<div>
		<button onClick={handleLogout}>Logout</button>
	</div>
	)
}