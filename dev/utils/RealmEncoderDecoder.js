import realm from '../database';
import _ from 'underscore';

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

export const setNotes = (notes, cb) => {
	let existingNoteIds = _.pluck(getNotesAsJson(), 'id');

	realm.write(() => {
		notes.map((note) => {
			if(existingNoteIds.indexOf(note.id) === -1) {
				note.created_on = new Date(note.created_on.toString());
				note.updated_on = new Date(note.updated_on.toString());
				realm.create('Note', note);
			}
		});
		cb();
	});
}