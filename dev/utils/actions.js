const ACTIONS = {
	getNotes: () => {
		return {
			type: 'GET_NOTES'
		}
	},
	searchNotes: (searchText) => {
		return {
			type: 'SEARCH',
			data: searchText
		}
	}
}
export default ACTIONS;