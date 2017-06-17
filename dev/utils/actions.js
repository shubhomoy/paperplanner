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
	},

	multipleOpen: () => {
		return {
			type: 'MULTIPLE_OPEN'
		}
	},

	multipleClose: () => {
		return {
			type: 'MULTIPLE_CLOSE'
		}
	},

	mark: (id) => {
		return {
			type: 'MARK',
			data: id
		}
	},

	unmark: (id) => {
		return {
			type: 'UNMARK',
			data: id
		}
	},

	markAll: (notes) => {
		return {
			type: 'MARK_ALL',
			data: notes
		}
	},

	unmarkAll: () => {
		return {
			type: 'UNMARK_ALL'
		}
	}
}
export default ACTIONS;