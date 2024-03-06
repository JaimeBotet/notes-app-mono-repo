import Note from './components/Note'
import NoteForm from './components/NoteForm';
import Notification from './components/Notification';
import { useNotes } from './hooks/useNotes'
import Table from 'react-bootstrap/Table'

const Notes = ({user}) => {
	const { notes, addNote, errorMessage, toggleImportanceOf } = useNotes()

	return (
		<div>
			<h1>Notes: Desde la APP</h1>

			<Notification message={errorMessage} />

			{ user ? <NoteForm addNote={addNote} /> : ""}

			<Table striped>
				<tbody>
					{notes.map( note => 
						<tr key={note.id}>
							<Note 
								{...note} 
							/>							
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
}

export default Notes;
