import realm from '../../database';

let initialState = {
	isSearching: false,
	items: []
}

export default (state = initialState, action) => {
	let notes = [];
	switch(action.type) {
		case 'GET_NOTES':
			notes = [];
			realm.objects('Note').sorted('updated_on', true).map((note) => {
				notes.push(note);
			})
			state = Object.assign({}, state, {isSearching: false, items: notes});
			return state;
			break;

		case 'SEARCH':
			notes = [];
			realm.objects('Note').sorted('updated_on', true).map((note) => {
				notes.push(note);
			});
			notes = notes.filter((note) => {
				if(note.note_text.toLowerCase().indexOf(action.data.toLowerCase()) !== -1) {
					return note;
				}
			})
			state = Object.assign({}, state, {isSearching: true, items: notes});;
			return state;
			break;
		default:
			return state;
	}
}