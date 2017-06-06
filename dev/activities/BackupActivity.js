import React from 'react';
import { View, Text, Image, TouchableNativeFeedback, ScrollView, Animated, AsyncStorage } from 'react-native';
import { ColorScheme } from '../css/style';
import { Actions } from 'react-native-router-flux';
import AppBar from '../components/AppBar';
import PrimaryButton from '../components/PrimaryButton';
import {GoogleSignin} from 'react-native-google-signin';
import { getAppAsJson, setNotes } from '../utils/RealmEncoderDecoder';
import Constants from '../utils/Constants';
import ASService from '../utils/AsyncStorageService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';

GoogleSignin.configure({
	scopes: ["https://www.googleapis.com/auth/drive.appdata"],
  	forceConsentPrompt: true
})
.then(() => {
	
});	

class BackupActivity extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			backupText: '',
			importText: '',
			backupAnimation: new Animated.Value(0),
			importAnimation: new Animated.Value(0),
			accountName: 'Not signed in'
		}
		this.backup = this.backup.bind(this);
		this.importNotes = this.importNotes.bind(this);
	}

	componentWillMount() {
		GoogleSignin.revokeAccess()
		.then(() => {
		  console.log('deleted');
		})
		.catch((err) => {

		})
		AsyncStorage.getItem(Constants.STORE).then((obj) => {
			this.setState({
				accountName: JSON.parse(obj).googleAccountName
			});	
		}).done();
	}

	hideImportMessage = () => {
		this.setState({
			importText: ''
		});
		Animated.timing(this.state.importAnimation, {
			toValue: 0
		}).start();
	}

	showImportMessage = (importText, willHide = true, timeout = 2000) => {
		this.setState({
			importText: importText
		});
		Animated.timing(this.state.importAnimation, {
			toValue: 27
		}).start(() => {
			if(willHide) {
				setTimeout(this.hideImportMessage, timeout);
			}
		});
	}

	hideBackupMessage = () => {
		this.setState({
			backupText: ''
		});
		Animated.timing(this.state.backupAnimation, {
			toValue: 0
		}).start();
	}

	showBackupMessage = (backupText, willHide = true, timeout = 2000) => {
		this.setState({
			backupText: backupText
		});
		Animated.timing(this.state.backupAnimation, {
			toValue: 27
		}).start(() => {
			if(willHide) {
				setTimeout(this.hideBackupMessage, timeout);
			}
		});
	}

	uploadFile = (accessToken, body) => {
		this.showBackupMessage('Backing up', false);
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
				this.showBackupMessage('Backup Complete');
		})
	}


	downloadFile = (fileId, accessToken) => {
		this.setState({
			importText: 'Downloading'
		});
		fetch('https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media', {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		}).then(response => {
			if(response.ok)
				return response.json();
		}).then(body => {
			this.showImportMessage('Import Complete');
			setNotes(body.notes, () => {
				this.props.getNotes();
			});
		})
	}

	importNotes = () => {
		GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
			GoogleSignin.signIn().then((user) => {
				this.setState({
					accountName: user.email
				});
				ASService.setItem({
					googleAccountName: user.email
				});
				this.showImportMessage('Importing Notes', false);
				fetch('https://www.googleapis.com/drive/v3/files?q=' + encodeURIComponent("'appDataFolder' in parents") + '&spaces=appDataFolder', {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + user.accessToken
					}
				}).then((response) => {
					if(response.ok)
						return response.json();
				}).then(body => {
					if(body && body.files && body.files.length > 0) {
						let fileId = body.files[0].id;
						this.downloadFile(fileId, user.accessToken);
					}else{
						this.showImportMessage('No backup found');
					}
				})
			}).catch((err) => {
				this.showImportMessage('Invalid Sign in');
			}).done();
		}).catch((err) => {
			this.showImportMessage('Play Service error');
		});
	}

	backup = () => {
		let entities = getAppAsJson();

		AsyncStorage.getItem(Constants.STORE).then((obj) => {
			let app = JSON.parse(obj);
			app.lastBackup = (new Date()).toString();
			ASService.setItem(app);
			app = Object.assign({}, app, entities);
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
					this.setState({
						accountName: user.email
					});
					ASService.setItem({
						googleAccountName: user.email
					});

			 	}).catch((err) => {
			    	this.showBackupMessage('Invalid Sign in');
			    }).done();
			}).catch((err) => {
				this.showBackupMessage('Play Services error');
			})
		}).done();
	}

	render() {
		return(
			<View>
				<AppBar title = "Backup and Import" backButton = {true} onBackListener = {Actions.pop}/>
				
				<ScrollView>
					
						<View style = {{flex: 1, flexDirection: 'row', paddingTop: 10}}>
							<Image source = {require('../images/backup_2.png')} style = {{height: 30, width: 30, marginLeft: 20, marginTop: 5}} />
							<Text style = {{paddingLeft: 20, flex: 1, paddingRight: 20, fontSize: 20, color: ColorScheme.text}}>
								Backup your notes to <Text style = {{fontWeight: 'bold'}}>Google Drive</Text>. You can restore them when you reinstall Paper. Notes you backup will <Text style = {{fontWeight: 'bold'}}>replace</Text> the previous backed up notes.
							</Text>
						</View>
						<View style = {{flexDirection: 'row', paddingLeft: 65, paddingTop: 30}}>
							<PrimaryButton title = "Backup" color = {ColorScheme.primary} onPressFunction = {this.backup}/>
						</View>
						<Animated.View style = {[errorStyle, {height: this.state.backupAnimation}]}>
							<Text style = {{color: '#fff', fontSize: 15}}>{this.state.backupText}</Text>
						</Animated.View>
						


						<View style = {{flex: 1, flexDirection: 'row', paddingTop: 10}}>
							<Image source = {require('../images/import_2.png')} style = {{height: 30, width: 30, marginLeft: 20, marginTop: 5}} />
							<Text style = {{paddingLeft: 20, flex: 1, paddingRight: 20, fontSize: 20, color: ColorScheme.text}}>
								Import notes from a previous backup from Google Drive.
							</Text>
						</View>
						<View style = {{flexDirection: 'row', paddingLeft: 65, paddingTop: 30}}>
							<PrimaryButton title = "Import" color = {ColorScheme.primary} onPressFunction = {this.importNotes}/>
						</View>
						<Animated.View style = {[errorStyle, {height: this.state.importAnimation}]}>
							<Text style = {{color: '#fff', fontSize: 15}}>{this.state.importText}</Text>
						</Animated.View>


						<View style = {{flex: 1, flexDirection: 'row', paddingTop: 50, paddingBottom: 100}}>
							<Image source = {require('../images/drive.png')} style = {{height: 30, width: 30, marginLeft: 20, marginTop: 5}} />
							<Text style = {{paddingLeft: 20, flex: 1, paddingRight: 20, fontSize: 20, color: ColorScheme.text}}>
								<Text style = {titleStyle}>Google Drive Settings</Text>{"\n\n"}
								<Text>Account</Text>{"\n"}
								<Text style = {{color: '#9e9e9e', fontSize: 15}}>{this.state.accountName}</Text>
							</Text>
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

function mapStateToProps(state) {
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getNotes: ACTIONS.getNotes
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BackupActivity);