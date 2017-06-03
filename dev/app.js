import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainActivity from './activities/MainActivity';
import NoteActivity from './activities/NoteActivity';
import SettingsActivity from './activities/SettingsActivity';
import ViewNoteActivity from './activities/ViewNoteActivity';
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
						<Scene key = "mainActivity" component = {MainActivity} initial = {true}/>
						<Scene key = "noteActivity" component = {NoteActivity}/>
						<Scene key = "viewNoteActivity" component = {ViewNoteActivity} />
						<Scene key = "settingsActivity" component = {SettingsActivity} />
					</Scene>
				</Router>
			</Provider>
		);
	}
}

export default App;