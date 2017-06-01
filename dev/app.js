import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainActivity from './activities/MainActivity';
import CreateEventActivity from './activities/CreateEventActivity';
import EventActivity from './activities/EventActivity';
import NoteActivity from './activities/NoteActivity';

const App = StackNavigator({
	Main: {
		screen: MainActivity
	},
	CreateEvent: {
		screen: CreateEventActivity
	},
	Event: {
		screen: EventActivity
	},
	Note: {
		screen: NoteActivity
	}
});

export default App;