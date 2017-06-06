import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, Image, PermissionsAndroid } from 'react-native';
import { ColorScheme } from '../css/style';
import { Actions } from 'react-native-router-flux';
import AppBar from '../components/AppBar';
import {GoogleSignin} from 'react-native-google-signin';
import realm from '../database';

GoogleSignin.configure({
	scopes: ["https://www.googleapis.com/auth/drive.appdata"],
  	forceConsentPrompt: true,
  	offlineAccess: true
})
.then(() => {
	
});		


class SettingsActivity extends React.Component {
	constructor(props) {
		super(props);
		this.backupNotes = this.backupNotes.bind(this);
		this.importNotes = this.importNotes.bind(this);
	}

	componentDidMount() {
	}

	backupNotes = () => {
		let app = {
			notes: []
		}
		realm.objects('Note').sorted('updated_on', true).map((note) => {
			let newNote = {
				id: note.id,
				title: note.title,
				note_text: note.note_text,
				is_locked: note.is_locked,
				created_on: note.created_on,
				updated_on: note.updated_on
			};
			app.notes.push(newNote);
		});
		app = JSON.stringify(app);



		GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
			GoogleSignin.signIn().then((user) => {

				const metaData = {
					name: 'backup.json',
				    mimeType: 'application/json',
				    parents: ['appDataFolder']
				}
				const multipartBody = '\r\n--foo_bar_baz\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'
				  + JSON.stringify(metaData) + '\r\n'
				  + '--foo_bar_baz\r\nContent-Type: application/json\r\n\r\n'
				  + app + '\r\n'
				  + '--foo_bar_baz--';

				fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
					method: 'POST',
					headers: {
						'Authorization': 'Bearer ' + user.accessToken,
						'Content-Type': `multipart/related; boundary=foo_bar_baz`,
						'Content-Length': multipartBody.length						
					},
					body: multipartBody
				}).then((response) => {
					console.warn(JSON.stringify(response));
				})


		 	}).catch((err) => {
		    	console.warn('WRONG SIGNIN', err);
		    }).done();
		}).catch((err) => {
			console.warn("Play services error", err.code, err.message);
		})
	}

	importNotes = () => {
		GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
			GoogleSignin.signIn().then((user) => {
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
						fetch('https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media', {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + user.accessToken
							}
						}).then(response => {
							console.warn(JSON.stringify(response));
							if(response.ok)
								return response.json();
						}).then(body => {
							console.warn(JSON.stringify(body));
						})
					}
				})
			}).catch((err) => {
				console.warn('WRONG SIGNIN', err);
			}).done();
		}).catch((err) => {
			console.warn("Play services error", err.code, err.message);
		})
	}

	render() {
		return(
			<View style = {{flex: 1}}>
				<AppBar title = "Settings" backButton/>
				<ScrollView>
					<TouchableHighlight activeOpacity = {0.9} underlayColor = {ColorScheme.primary} onPress = {() => null} onPress = {() => this.backupNotes()}>
						<View>
							<View style = {listItemStyle}>
								<Image source = {require('../images/backup.png')} style = {iconStyle}/>
								<Text style = {listTextStyle}>Backup Notes</Text>
							</View>
							<View style = {sepStyle}/>
						</View>
					</TouchableHighlight>
					<TouchableHighlight activeOpacity = {0.9} underlayColor = {ColorScheme.primary} onPress = {() => this.importNotes()}>
						<View>
							<View style = {listItemStyle}>
								<Image source = {require('../images/import.png')} style = {iconStyle}/>
								<Text style = {listTextStyle}>Import Notes</Text>
							</View>
							<View style = {sepStyle}/>
						</View>
					</TouchableHighlight>
					<TouchableHighlight activeOpacity = {0.9} underlayColor = {ColorScheme.primary} onPress = {() => null} onPress = {Actions.createPasswordActivity}>
						<View>
							<View style = {listItemStyle}>
								<Image source = {require('../images/key.png')} style = {iconStyle}/>
								<Text style = {listTextStyle}>Create/Change Password</Text>
							</View>
							<View style = {sepStyle}/>
						</View>
					</TouchableHighlight>
					<TouchableHighlight activeOpacity = {0.9} underlayColor = {ColorScheme.primary} onPress = {() => null}>
						<View>
							<View style = {listItemStyle}>
								<Image source = {require('../images/info.png')} style = {iconStyle}/>
								<Text style = {listTextStyle}>About</Text>
							</View>
							<View style = {sepStyle}/>
						</View>
					</TouchableHighlight>
				</ScrollView>
			</View>
		);
	}
}

const listItemStyle = {
	backgroundColor: '#fff',
	paddingLeft: 20,
	paddingRight: 20,
	paddingTop: 20,
	paddingBottom: 20,
	flex: 1,
	flexDirection: 'row',
	alignItems: 'center'
}

const listTextStyle = {
	fontSize: 20,
	color: '#212121',
	paddingLeft: 5
}

const iconStyle = {
	height: 20,
	width: 20,
	marginRight: 20
}

const sepStyle = {
	flex: 1,
	height: 0.5,
	backgroundColor: '#dedede',
	marginLeft: 60
}

export default SettingsActivity;