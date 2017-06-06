import React from 'react';
import { View, Text, Image, TouchableNativeFeedback, ScrollView, Animated } from 'react-native';
import { ColorScheme } from '../css/style';
import { Actions } from 'react-native-router-flux';
import AppBar from '../components/AppBar';
import PrimaryButton from '../components/PrimaryButton';
import {GoogleSignin} from 'react-native-google-signin';
import { getAppAsJson } from '../utils/RealmEncoderDecoder';
import Constants from '../utils/Constants';

GoogleSignin.configure({
	scopes: ["https://www.googleapis.com/auth/drive.appdata"],
  	forceConsentPrompt: true
})
.then(() => {
	
});	

export default class BackupActivity extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			errorText: '',
			animation: new Animated.Value(0),
			accountName: 'Not signed in'
		}
		this.backup = this.backup.bind(this);
	}

	componentDidMount() {
	}

	hideError = () => {
		this.setState({
			errorText: ''
		});
		Animated.timing(this.state.animation, {
			toValue: 0
		}).start();
	}

	showError = (errorText, willHide = true, timeout = 2000) => {
		this.setState({
			errorText: errorText
		});
		Animated.timing(this.state.animation, {
			toValue: 27
		}).start(() => {
			if(willHide) {
				setTimeout(this.hideError, timeout);
			}
		});
	}

	uploadFile = (accessToken, body) => {
		this.showError('Backing up', false);
		fetch(Constants.DRIVE_UPLOAD_URL, {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + accessToken,
				'Content-Type': 'multipart/related; boundary=' + Constants.MULTIPART_BOUNDARY_STRING,
				'Content-Length': body.length						
			},
			body: body
		}).then((response) => {
			if(response.ok)
				this.showError('Backup Complete');
		})
	}

	backup = () => {
		let app = getAppAsJson();
		app = JSON.stringify(app);

		GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
			GoogleSignin.signIn().then((user) => {

				const metaData = {
					name: Constants.GOOGLE_BACKUP_FILENAME,
				    mimeType: 'application/json',
				    parents: ['appDataFolder']
				}
				const multipartBody = '\r\n--' + Constants.MULTIPART_BOUNDARY_STRING + '\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'
				  + JSON.stringify(metaData) + '\r\n'
				  + '--' + Constants.MULTIPART_BOUNDARY_STRING + '\r\nContent-Type: application/json\r\n\r\n'
				  + app + '\r\n'
				  + '--' + Constants.MULTIPART_BOUNDARY_STRING + '--';

				this.uploadFile(user.accessToken, multipartBody);

		 	}).catch((err) => {
		    	this.showError('Invalid Sign in');
		    }).done();
		}).catch((err) => {
			this.showError('Play Services error');
		})
	}

	render() {
		return(
			<View>
				<AppBar title = "Backup and Import" backButton = {true} onBackListener = {Actions.pop}/>
				<ScrollView>
					<View>
						<View style = {{flex: 1, flexDirection: 'row', paddingTop: 10}}>
							<Image source = {require('../images/backup_2.png')} style = {{height: 30, width: 30, marginLeft: 20, marginTop: 5}} />
							<Text style = {{paddingLeft: 20, flex: 1, paddingRight: 20, fontSize: 20, color: ColorScheme.text}}>
								Backup your notes to <Text style = {{fontWeight: 'bold'}}>Google Drive</Text>. You can restore them when you reinstall Paper. Notes you backup will <Text style = {{fontWeight: 'bold'}}>replace</Text> the previous backed up notes.
							</Text>
						</View>
						<View style = {{flexDirection: 'row', paddingLeft: 65, paddingTop: 30}}>
							<PrimaryButton title = "Backup" color = {ColorScheme.primary} onPressFunction = {this.backup}/>
						</View>
						<Animated.View style = {[errorStyle, {height: this.state.animation}]}>
							<Text style = {{color: '#fff', fontSize: 15}}>{this.state.errorText}</Text>
						</Animated.View>
						<View style = {{flex: 1, flexDirection: 'row', paddingTop: 10}}>
							<Image source = {require('../images/drive.png')} style = {{height: 30, width: 30, marginLeft: 20, marginTop: 5}} />
							<Text style = {{paddingLeft: 20, flex: 1, paddingRight: 20, fontSize: 20, color: ColorScheme.text}}>
								<Text style = {titleStyle}>Google Drive Settings</Text>{"\n\n"}
								<Text>Account</Text>{"\n"}
								<Text style = {{color: '#9e9e9e', fontSize: 15}}>{this.state.accountName}</Text>
							</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const textStyle = {

}

const titleStyle = {
	fontWeight: 'bold',
	color: ColorScheme.primary
}

const errorStyle = {
	backgroundColor: ColorScheme.primary,
	marginTop: 10,
	height: 0,
	marginBottom: 30,
	justifyContent: 'center',
	alignItems: 'center'
}