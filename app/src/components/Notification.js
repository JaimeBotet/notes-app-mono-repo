import React from 'react'

export default function Notification ({ message }) {
		
	return (
		<div className="error">
			{message 
				? <span style={{color: 'red'}}>{message}</span>
				: ""
			}
		
		</div>
	)
}