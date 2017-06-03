import React from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { ColorScheme, styles } from '../css/style';
import { Actions } from 'react-native-router-flux';

export default class AppBar extends React.Component {
	render() {
		if(this.props.backButton) {
			return(
				<View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom:5, height: 55}}>
					<TouchableNativeFeedback background = {TouchableNativeFeedback.SelectableBackgroundBorderless()} onPress = {Actions.pop}>
						<View style = {{padding: 16}}>
							<Image source = {require('../images/back.png')} style = {{height: 20, width: 20}}/>
						</View>
					</TouchableNativeFeedback>
					<Text style = {styles.pageTitle}>{this.props.title}</Text>
				</View>
			);
		}else{
			return(
				<View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom:5, height: 55}}>
					<Text style = {[styles.pageTitle, {marginLeft: 16}]}>{this.props.title}</Text>
				</View>
			);
		}
	}
}