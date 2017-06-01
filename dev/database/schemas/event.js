class Event{};
Event.schema = {
	name: 'Event',
	primaryKey: 'id',
	properties: {
		id: 'string',
		title: 'string',
		notes: {
			type: 'list',
			objectType: 'Note'
		},
		created_on: 'date',
		updated_on: 'date'
	}
}

export default Event;