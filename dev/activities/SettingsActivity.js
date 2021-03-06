import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, Image, PermissionsAndroid } from 'react-native';
import { ColorScheme } from '../css/style';
import { Actions } from 'react-native-router-flux';
import AppBar from '../components/AppBar';
import {GoogleSignin} from 'react-native-google-signin';
import realm from '../database';

GoogleSignin.configure({
	scopes: ["https://www.googleapis.com/auth/drive.appdata"],
  	forceConsentPrompt: true
})
.then(() => {
	
});		


class SettingsActivity extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}


	render() {
		return(
			<View style = {{flex: 1}}>
				<AppBar title = "Settings" backButton/>
				<ScrollView>
					<TouchableHighlight activeOpacity = {0.9} underlayColor = {ColorScheme.primary} onPress = {() => null} onPress = {Actions.backupActivity}>
						<View>
							<View style = {listItemStyle}>
								<Image source = {require('../images/drive_2.png')} style = {iconStyle}/>
								<Text style = {listTextStyle}>Backup and Import Notes</Text>
							</View>
							<View style = {sepStyle}/>
						</View>
					</TouchableHighlight>
					<TouchableHighlight activeOpacity = {0.9} underlayColor = {ColorScheme.primary} onPress = {() => null} onPress = {Actions.createPasswordActivity}>
						<View>
							<View style = {listItemStyle}>
								<Image source = {require('../images/key.png')} style = {iconStyle}/>
								<Text style = {listTextStyle}>Create or Change Password</Text>
							</View>
							<View style = {sepStyle}/>
						</View>
					</TouchableHighlight>
					<TouchableHighlight activeOpacity = {0.9} underlayColor = {ColorScheme.primary} onPress = {Actions.aboutActivity}>
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
	fontSize: 17,
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