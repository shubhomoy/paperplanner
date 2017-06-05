let initialState = {
	searchText: ''
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'CLEAR_SEARCH':
			state = Object.assign({}, state, {searchText: ''});
			return state;
			break;
		case 'CHANGE_SEARCH_TEXT':
			state = Object.assign({}, state, {searchText: action.data});
			return state;
			break;
		default:
			return state;
	}
}