import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainActivity from './activities/MainActivity';
import EventListActivity from './activities/EventListActivity';
import CreateEventActivity from './activities/CreateEventActivity';
import EventActivity from './activities/EventActivity';
import NoteActivity from './activities/NoteActivity';
import { Scene, Router } from 'react-native-router-flux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './utils/reducers';
import middlewares from './utils/middlewares';

const store = createStore(reducers, {}, middlewares);


class App extends React.Component {
	render() {
		return(
			<Provider store = {store}>
				<Router hideNavBar>
					<Scene key = "root">
						<Scene key = "mainActivity" component = {MainActivity} />
						<Scene key = "eventListActivity" component = {EventListActivity} title = "Events"/>
						<Scene key = "createEventActivity" component = {CreateEventActivity}/>
						<Scene key = "eventActivity" component = {EventActivity} hideNavBar/>
						<Scene key = "noteActivity" component = {NoteActivity} title = "Add Note"/>
					</Scene>
				</Router>
			</Provider>
		);
	}
}

export default App;