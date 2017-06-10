import Realm from 'realm';
import Event from './schemas/event';
import Note from './schemas/note';

let realm = new Realm({
	schema: [Note],
	schemaVersion: 2,
	migration: (oldRealm, newRealm) => {
		if (oldRealm.schemaVersion < 2) {
			var oldObjects = oldRealm.objects('Note');

		    for (var i = 0; i < oldObjects.length; i++) {
		    	oldObjects[i].color = '#fff';
		    }
		}
	}
});

export default realm;

