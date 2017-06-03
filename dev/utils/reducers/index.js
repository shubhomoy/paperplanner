import { combineReducers } from 'redux';
import NoteReducer from './noteReducer';

export default combineReducers({
	notes: NoteReducer
});