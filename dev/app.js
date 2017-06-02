import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainActivity from './activities/MainActivity';
import CreateEventActivity from './activities/CreateEventActivity';
import EventActivity from './activities/EventActivity';
import NoteActivity from './activities/NoteActivity';
import { Scene, Router } from 'react-native-router-flux';

class App extends React.Component {
	render() {
		return(
			<Router hideNavBar>
				<Scene key = "root">
					<Scene key = "mainActivity" component = {MainActivity} title = "Events" initial = {true}/>
					<Scene key = "createEventActivity" component = {CreateEventActivity}/>
					<Scene key = "eventActivity" component = {EventActivity} hideNavBar/>
					<Scene key = "noteActivity" component = {NoteActivity} title = "Add Note"/>
				</Scene>
			</Router>
		);
	}
}

export default App;