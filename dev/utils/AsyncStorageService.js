import { AsyncStorage } from 'react-native';
import Constants from './Constants';

let app = {
	is_password_set: false,
	password: '',
	googleAccountName: '',
	lastBackup: '',
	notes: []
}

AsyncStorage.getItem(Constants.STORE).then((obj) => {
	if(obj) {
		app = Object.assign({}, app, JSON.parse(obj));
	}
}).done();

const ASService = {
	setItem: (obj) => {
		app = Object.assign({}, app, obj);
		AsyncStorage.setItem(Constants.STORE, JSON.stringify(app), (result) => {
			return true;
		});
	}
}

export default ASService;