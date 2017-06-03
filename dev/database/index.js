import Realm from 'realm';
import Event from './schemas/event';
import Note from './schemas/note';

let realm = new Realm({
	schema: [Note],
	schemaVersion: 1,
	migration: (oldRealm, newRealm) => {

	}
});

export default realm;

