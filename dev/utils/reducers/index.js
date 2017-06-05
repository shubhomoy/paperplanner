import { combineReducers } from 'redux';
import NoteReducer from './noteReducer';
import AppReducer from './appReducer';

export default combineReducers({
	app: AppReducer,
	notes: NoteReducer
});