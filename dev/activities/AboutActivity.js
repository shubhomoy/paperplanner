import React from 'react';
import { View, Text, Image, ScrollView, TouchableNativeFeedback, Dimensions } from 'react-native';
import { ColorScheme } from '../css/style';
import { Actions } from 'react-native-router-flux';
import AppBar from '../components/AppBar';

export default class AboutActivity extends React.Component {
	render() {
		return(
			<View style = {{flex: 1}}>
				<AppBar title = "About" backButton = {true} onBackListener = {Actions.pop}/>
				<View style = {{alignItems: 'center', flex: 1}}>
					<Image source = {require('../images/logo.png')} style = {{height: 100, width: 100, marginTop: 30}}/>
					<Text style = {titleStyle}>Paper</Text>
					<Text style = {versionStyle}>Version 1.1.2</Text>
					<Text style = {[versionStyle, {color: '#757575'}]}>Build #120</Text>
				</View>
				<View style = {{flex: 1, justifyContent: 'flex-end', alignItems:'center'}}>
					<TouchableNativeFeedback onPress = {Actions.termsActivity}>
						<View style = {{padding: 15}}>
							<Text style = {{fontSize: 20, color: ColorScheme.text}}>Privacy Policy</Text>
						</View>
					</TouchableNativeFeedback>
					<View style = {{height: 0.5, backgroundColor: '#757575', width: Dimensions.get('window').width/2}}/>
					<TouchableNativeFeedback onPress = {Actions.thirdPartyActivity}>
						<View style = {{padding: 15, marginBottom: 20}}>
							<Text style = {{fontSize: 20, color: ColorScheme.text}}>Third-party softwares</Text>
						</View>
					</TouchableNativeFeedback>
					<Text style = {footerTextStyle}>Created with <Image source = {require('../images/like.png')} style = {{width: 45, height: 45}}/> by Bitslate</Text>
				</View>
			</View>
		);
	}
}

const footerTextStyle = {
	color: '#757575',
	fontSize: 17,
	padding: 10
}

const versionStyle = {
	color: '#9e9e9e',
	fontSize: 20,
	marginTop: 5
}

const titleStyle = {
	color: ColorScheme.text,
	fontSize: 40,
	marginTop: 10
}