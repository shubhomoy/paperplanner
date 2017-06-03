import realm from '../../database';

export default (state = [], action) => {
	switch(action.type) {
		case 'GET_NOTES':
			let notes = [];
			realm.objects('Note').sorted('updated_on', true).map((note) => {
				notes.push(note);
			})
			state = notes;
			return state;
			break;
		default:
			return state;
	}
}