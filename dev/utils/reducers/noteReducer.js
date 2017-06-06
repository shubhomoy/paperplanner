import realm from '../../database';

let initialState = {
	isSearching: false,
	allNotes: [],
	activeNotes: []
}

export default (state = initialState, action) => {
	let notes = [];
	switch(action.type) {
		case 'GET_NOTES':
			notes = [];
			realm.objects('Note').sorted('updated_on', true).map((note) => {
				notes.push(note);
			})
			state = Object.assign({}, state, {isSearching: false, allNotes: notes, activeNotes: notes});
			return state;
			break;

		case 'SEARCH':
			if(!action.isSearching){
				state = Object.assign({}, state, {isSearching: false, activeNotes: state.allNotes});
				return state;
			}
			notes = [];
			notes = state.allNotes.filter((note) => {
				if(note.note_text.toLowerCase().indexOf(action.data.toLowerCase()) !== -1) {
					return note;
				}
			})
			state = Object.assign({}, state, {isSearching: true, activeNotes: notes});
			return state;
			break;
		default:
			return state;
	}
}