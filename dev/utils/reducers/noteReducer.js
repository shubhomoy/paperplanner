import realm from '../../database';

export default (state = [], action) => {
	let notes = [];
	switch(action.type) {
		case 'GET_NOTES':
			notes = [];
			realm.objects('Note').sorted('updated_on', true).map((note) => {
				notes.push(note);
			})
			state = notes;
			return state;
			break;

		case 'SEARCH':
			notes = [];
			realm.objects('Note').sorted('updated_on', true).map((note) => {
				notes.push(note);
			});
			notes = notes.filter((note) => {
				if(note.note_text.indexOf(action.data) !== -1) {
					return note;
				}
			})
			state = notes;
			return state;
			break;
		default:
			return state;
	}
}