import Realm from 'realm';
import Event from './event';
import Note from './note';

let realm = new Realm({
	schema: [Event, Note],
	schemaVersion: 1,
	migration: (oldRealm, newRealm) => {

	}
});

export default realm;

