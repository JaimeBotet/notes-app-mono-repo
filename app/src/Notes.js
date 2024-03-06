import Note from './components/Note'
import NoteForm from './components/NoteForm';
import Notification from './components/Notification';
import { useNotes } from './hooks/useNotes'

const Notes = ({user}) => {
	const { notes, addNote, errorMessage, toggleImportanceOf } = useNotes()

	return (
		<div>
			<h1>Notes: Desde la APP</h1>

			<Notification message={errorMessage} />

			{ user ? <NoteForm addNote={addNote} /> : ""}

			<ol>
				{notes.map( note => 
					<Note 
						key={note.id} 
						{...note} 
					/>
				)}
			</ol>
		</div>
	);
}

export default Notes;
