import React from "react"; 

const Note = (props) => {
	const {content, date} = props
	return (
		<li className="note">
			<div>
				{content}
			</div>
			<small>{date}</small>
		</li>
	)
}

export default Note