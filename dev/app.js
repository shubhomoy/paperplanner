import React from 'react';
import MainActivity from './activities/MainActivity';
import NoteActivity from './activities/NoteActivity';
import SettingsActivity from './activities/SettingsActivity';
import BackupActivity from './activities/BackupActivity';
import AboutActivity from './activities/AboutActivity';
import ThirdPartyActivity from './activities/ThirdPartyActivity';
import TermsActivity from './activities/TermsActivity';
import CreatePasswordActivity from './activities/CreatePasswordActivity';
import ViewNoteActivity from './activities/ViewNoteActivity';
import { Scene, Router } from 'react-native-router-flux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './utils/reducers';
import middlewares from './utils/middlewares';
import PropTypes from 'prop-types';

const store = createStore(reducers, {}, middlewares);


class App extends React.Component {

	constructor(props) {
		super(props);	
	}

	render() {
		return(
			<Provider store = {store}>
				<Router hideNavBar>
					<Scene key = "root">
						<Scene key = "mainActivity" component = {MainActivity} initial = {true} shareText = {this.props.shareText}/>
						<Scene key = "noteActivity" component = {NoteActivity}/>
						<Scene key = "viewNoteActivity" component = {ViewNoteActivity} />
						<Scene key = "settingsActivity" component = {SettingsActivity} />
						<Scene key = "createPasswordActivity" component = {CreatePasswordActivity} direction = "vertical"/>
						<Scene key = "backupActivity" component = {BackupActivity} direction = "vertical"/>
						<Scene key = "aboutActivity" component = {AboutActivity} direction = "vertical"/>
						<Scene key = "thirdPartyActivity" component = {ThirdPartyActivity}/>
						<Scene key = "termsActivity" component = {TermsActivity}/>
					</Scene>
				</Router>
			</Provider>
		);
	}
}

export default App;