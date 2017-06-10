let initialState = {
	searchText: '',
	hideKeyboard: false,
	scrollToTop: false
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
		case 'SCROLL':
			state = Object.assign({}, state, {scrollToTop: true});
			return state;
			break;
		case 'NOT_SCROLL':
			state = Object.assign({}, state, {scrollToTop: false});
			return state;
			break;
		default:
			return state;
	}
}