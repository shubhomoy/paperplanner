let initialState = {
	searchText: '',
	hideKeyboard: false,
	scrollToTop: false,
	multiple: false,
	selectedItems: [],
	markAll: false
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
		case 'MULTIPLE_OPEN':
			state = Object.assign({}, state, {multiple: true, selectedItems: [], markAll: false});
			return state;
			break;
		case 'MULTIPLE_CLOSE':
			state = Object.assign({}, state, {multiple: false, selectedItems: [], markAll: false});
			return state;
			break;
		case 'MARK':
			state = Object.assign({}, state, {
				selectedItems: state.selectedItems.concat(action.data)
			});
			return state;
			break;
		case 'UNMARK':
			state = Object.assign({}, state, {
				selectedItems: state.selectedItems.filter((val) => {
					return val != action.data
				})
			});
			return state;
			break;
		case 'MARK_ALL':
			state = Object.assign({}, state, {markAll: true, selectedItems: []});
			return state;
			break;
		case 'UNMARK_ALL':
			state = Object.assign({}, state, {markAll: false, selectedItems: []});
			return state;
			break;
		default:
			return state;
	}
}