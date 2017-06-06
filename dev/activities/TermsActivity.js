import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ColorScheme } from '../css/style';
import { Actions } from 'react-native-router-flux';
import AppBar from '../components/AppBar';

export default class TermsActivity extends React.Component {
	render() {
		return(
			<View style = {{flex: 1}}>
				<AppBar title = "Privacy Policy" backButton = {true} onBackListener = {Actions.pop}/>
				<ScrollView>
					<Text style = {textStyle}>
						Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our app.{"\n\n\n"} 

						<Text style = {{fontWeight: 'bold'}}>What personal information do we collect from you?</Text>{"\n"}
						When using the app, you may be asked to backup your notes to your Google Drive account. The backup is stored in separate 'Backups' area in your Google Drive which is only accessible from the app itself and not by any other user.{"\n\n\n"} 


						<Text style = {{fontWeight: 'bold'}}>When do we collect information?</Text>{"\n"}
						We do not collect this information but the information is stored in your Google Drive account in a separate area for apps backup and only when you give permission to backup the notes.{"\n\n\n"} 

						
						<Text style = {{fontWeight: 'bold'}}>How do we use your information?</Text>{"\n"}
						We don’t use your backup notes or have access to them because the app uploads the backup to your Google Drive account under a separate section for apps backup.{"\n\n\n"} 

						<Text style = {{fontWeight: 'bold'}}>Third-party disclosure</Text>{"\n"}
						We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information.{"\n\n\n"}


						<Text style = {{fontWeight: 'bold'}}>Does our app allow third-party behavioral tracking?</Text>{"\n"}
						It's also important to note that we do not allow third-party behavioral tracking.{"\n\n\n"}


						<Text style = {{fontWeight: 'bold'}}>Contacting Us</Text>{"\n"}
						If there are any questions regarding this privacy policy, you may contact us using the information below.{"\n\n\n\n\n\n"} 

						<Text style = {{fontWeight: 'bold'}}>Paper</Text>{"\n"}
						admin@pinpost.in{"\n\n"}

						Last Edited on 2017-06-07
					</Text>

				</ScrollView>
				
			</View>
		);
	}
}

const textStyle = {
	color: '#757575',
	fontSize: 17,
	paddingLeft: 40,
	paddingRight: 40,
	paddingTop: 20,
	paddingBottom: 50
}

const titleStyle = {
	color: ColorScheme.text,
	fontSize: 25,
	paddingTop: 30,
	paddingLeft: 40,
	paddingRight: 40
}