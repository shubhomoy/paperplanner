class Note {};
Note.schema = {
	name: 'Note',
	primaryKey: 'id',
	properties: {
		id: 'string',
		title: {type: 'string', default: ''},
		note_text: 'string',
		is_locked: { type: 'bool', default: false},
		color: { type: 'string', default: '#fff'  },
		created_on: 'date',
		updated_on: 'date'
	}
}

export default Note;