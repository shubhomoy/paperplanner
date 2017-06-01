class Note {};
Note.schema = {
	name: 'Note',
	primaryKey: 'id',
	properties: {
		id: 'string',
		description: 'string',
		created_on: 'date',
		updated_on: 'date'
	}
}

export default Note;