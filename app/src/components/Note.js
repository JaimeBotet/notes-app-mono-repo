import React from "react"; 
import { Link } from "react-router-dom";

const Note = (props) => {
	const {content, date, id} = props
	return (
		<>
			<td className="note">
				<Link to={'/notes/' + id}>{content}</Link>
			</td>
			<td>
				<small>{date}</small>
			</td>
		</>
	)
}

export default Note