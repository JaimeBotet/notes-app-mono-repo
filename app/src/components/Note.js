import React from "react"; 
import { Link } from "react-router-dom";

const Note = (props) => {
	const {content, date, id} = props
	return (
		<li className="note">
			<Link to={'/notes/' + id}>{content}</Link>
			<small>{date}</small>
		</li>
	)
}

export default Note