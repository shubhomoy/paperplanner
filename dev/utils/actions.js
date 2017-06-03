const ACTIONS = {
	saveNote: (note) => {
		return {
			type: 'SAVE_NOTE',
			data: note
		}
	},

	getNotes: () => {
		return {
			type: 'GET_NOTES'
		}
	}
}
export default ACTIONS;