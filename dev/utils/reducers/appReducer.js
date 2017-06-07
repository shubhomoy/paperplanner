let initialState = {
	searchText: '',
	hideKeyboard: false
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'HIDE_KEYBOARD':
			state = Object.assign({}, state, {hideKeyboard: true});
			return state;
			break;
		case 'CHANGE_SEARCH_TEXT':
			state = Object.assign({}, state, {searchText: action.data, hideKeyboard: false});
			return state;
			break;
		default:
			return state;
	}
}