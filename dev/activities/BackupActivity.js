import React from 'react';
import { View, Text, Image, TouchableNativeFeedback, ScrollView, Animated, AsyncStorage, Alert } from 'react-native';
import { ColorScheme } from '../css/style';
import { Actions } from 'react-native-router-flux';
import AppBar from '../components/AppBar';
import PrimaryButton from '../components/PrimaryButton';
import { GoogleSignin } from 'react-native-google-signin';
import Constants from '../utils/Constants';
import ASService from '../utils/AsyncStorageService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';
import _ from 'underscore';
import Services from '../utils';
import moment from 'moment';

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
			lastBackup: 'NA',
			backupAnimation: new Animated.Value(0),
			importAnimation: new Animated.Value(0),
			accountName: 'Not signed in'
		}
		this.backup = this.backup.bind(this);
		this.importNotes = this.importNotes.bind(this);
	}

	componentDidMount() {
		AsyncStorage.getItem(Constants.STORE).then((obj) => {
			let app = JSON.parse(obj);
			if(app.lastBackup === 'NA') {
				this.setState({
					lastBackup: 'NA'
				})
			}else{
				this.setState({
					lastBackup: moment(app.lastBackup).format('Do MMM YYYY').toString()
				})
			}			
		}).done();
	}

	componentWillMount() {
		GoogleSignin.currentUserAsync().then((user) => {
			if(user) {
				GoogleSignin.revokeAccess().then(() => {
				  console.log('deleted');
				}).catch((err) => {

				});
			}
		}).done();
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


	downloadFile = (fileId, accessToken, backup = false) => {
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
			if(!backup) {
				this.showImportMessage('Import Complete');
				Services.setNotes(body.notes, () => {
					this.props.getNotes();
				});
			}else{
				this.backupUtil(accessToken, body.notes);
			}
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
		GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
			GoogleSignin.signIn().then((user) => {
				this.setState({
					accountName: user.email
				});
				ASService.setItem({
					googleAccountName: user.email
				});
				this.showBackupMessage('Backing up', false);

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
						Alert.alert('Backup Found', 'An existing backup is found. Do you want to overwrite or update the past backup?', [
							{
								text: 'Overwrite',
								onPress: () => {
									this.backupUtil(user.accessToken);
								}
							},
							{
								text: 'Update',
								onPress: () => {
									this.downloadFile(fileId, user.accessToken, true);
								}
							}
						],
						{
							cancelable: false
						});
					}else{
						this.backupUtil(user.accessToken);
					}
				})
			}).catch((err) => {
				this.showBackupMessage('Invalid Sign in');
			}).done();
		}).catch((err) => {
			this.showBackupMessage('Play Service error');
		});
	}

	backupUtil = (accessToken, backedUpNotes = []) => {
		let entities = Services.getAppAsJson();
		let backedUpIds = _.pluck(backedUpNotes, 'id');
		let existingIds = _.pluck(entities.notes, 'id');
		let allIds = _.union(existingIds, backedUpIds);
		let notesToBackup = {
			notes: []
		};
		allIds.map((id) => {
			let index = existingIds.indexOf(id);
			if(index !== -1) {
				notesToBackup.notes.push(entities.notes[index]);
			}else{
				index = backedUpIds.indexOf(id);
				notesToBackup.notes.push(backedUpNotes[index]);
			}
		});
		

		AsyncStorage.getItem(Constants.STORE).then((obj) => {
			let app = JSON.parse(obj);
			app.lastBackup = (new Date()).toString();
			this.setState({
				lastBackup: moment(app.lastBackup).format('Do MMM YYYY').toString()
			})
			ASService.setItem(app);
			app = Object.assign({}, app, notesToBackup);
			app = JSON.stringify(app);

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

			this.uploadFile(accessToken, multipartBody);			
		}).done();
	}

	render() {
		return(
			<View>
				<AppBar title = "Backup and Import" backButton = {true} onBackListener = {Actions.pop}/>
				
				<ScrollView>
					
						<View style = {{flex: 1, flexDirection: 'row', paddingTop: 10}}>
							<Image source = {require('../images/backup_2.png')} style = {{height: 30, width: 30, marginLeft: 20, marginTop: 5}} />
							<Text style = {[textStyle, {paddingLeft: 20, flex: 1, paddingRight: 20, color: ColorScheme.text}]}>
								Backup your notes to <Text style = {{fontWeight: 'bold'}}>Google Drive</Text>. You can restore them when you reinstall Paper.
							</Text>
						</View>
						<Text style = {[textStyle, {paddingLeft: 70, flex: 1, paddingRight: 20, color: '#9e9e9e', paddingTop: 30, fontSize: 13}]}>
							<Text style = {{color: ColorScheme.text}}>Last Backup:</Text> {this.state.lastBackup}
						</Text>
						<View style = {{flexDirection: 'row', paddingLeft: 65, paddingTop: 10}}>
							<PrimaryButton title = "Backup" color = {ColorScheme.primary} onPressFunction = {this.backup}/>
						</View>
						<Animated.View style = {[errorStyle, {height: this.state.backupAnimation}]}>
							<Text style = {{color: '#fff', fontSize: 15}}>{this.state.backupText}</Text>
						</Animated.View>
						


						<View style = {{flex: 1, flexDirection: 'row', paddingTop: 10}}>
							<Image source = {require('../images/import_2.png')} style = {{height: 30, width: 30, marginLeft: 20, marginTop: 5}} />
							<Text style = {[textStyle, {paddingLeft: 20, flex: 1, paddingRight: 20, color: ColorScheme.text}]}>
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
							<Text style = {{paddingLeft: 20, flex: 1, paddingRight: 20, fontSize: 17, color: ColorScheme.text}}>
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
	fontSize: 17
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