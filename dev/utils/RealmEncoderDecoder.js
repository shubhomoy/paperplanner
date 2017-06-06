import realm from '../database';

export const getNotesAsJson = () => {
	let notes = [];
	realm.objects('Note').sorted('updated_on', true).map((note) => {
		let newNote = {
			id: note.id,
			title: note.title,
			note_text: note.note_text,
			is_locked: note.is_locked,
			created_on: note.created_on,
			updated_on: note.updated_on
		};
		notes.push(newNote);
	});
	
	return notes;
}

export const getAppAsJson = () => {
	let app = {
		notes: getNotesAsJson()
	};
	return app;
}

