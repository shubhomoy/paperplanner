import guid from './IDGenerator';
import { getAppAsJson, setNotes, getNotesAsJson, deleteAllNotes, deleteSelectedNotes } from './RealmEncoderDecoder';

const Services = {
	getUniqueID: guid,
	getAppAsJson: getAppAsJson,
	setNotes: setNotes,
	getNotesAsJson: getNotesAsJson,
	deleteAllNotes: deleteAllNotes,
	deleteSelectedNotes: deleteSelectedNotes
};

export default Services;