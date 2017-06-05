const ACTIONS = {
	getNotes: () => {
		return {
			type: 'GET_NOTES'
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
	}
}
export default ACTIONS;