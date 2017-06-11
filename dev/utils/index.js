import guid from './IDGenerator';
import { getAppAsJson, setNotes, getNotesAsJson } from './RealmEncoderDecoder';

const Services = {
	getUniqueID: guid,
	getAppAsJson: getAppAsJson,
	setNotes: setNotes,
	getNotesAsJson: getNotesAsJson
};

export default Services;