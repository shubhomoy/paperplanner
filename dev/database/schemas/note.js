class Note {};
Note.schema = {
	name: 'Note',
	primaryKey: 'id',
	properties: {
		id: 'string',
		note_text: 'string',
		created_on: 'date',
		updated_on: 'date'
	}
}

export default Note;