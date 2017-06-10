const ACTIONS = {
	getNotes: () => {
		return {
			type: 'GET_NOTES'
		}
	},
	hideKeyboard: () => {
		return {
			type: 'HIDE_KEYBOARD'
		}
	},
	searchNotes: (searchText) => {
		if(searchText.trim().length > 0) {
			return {
				type: 'SEARCH',
				data: searchText,
				isSearching: true
			}
		}else{
			return {
				type: 'SEARCH',
				data: searchText,
				isSearching: false
			}
		}
	},

	scrollToTop: () => {
		return {
			type: 'SCROLL'
		}
	},

	notScrollToTop: () => {
		return {
			type: 'NOT_SCROLL'
		}
	}
}
export default ACTIONS;