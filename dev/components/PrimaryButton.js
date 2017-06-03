import React from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { ColorScheme, styles } from '../css/style';

export default class PrimaryButton extends React.Component {
	render() {
		return(
			<TouchableNativeFeedback onPress = {() => this.props.onPressFunction()} background = {TouchableNativeFeedback.SelectableBackground()}>
				<View style = {container}>
					<Text style = {btnText}>{this.props.title.toUpperCase()}</Text>
				</View>
			</TouchableNativeFeedback>
		);
	}
}

const container = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: ColorScheme.primary,
	padding: 5,
	paddingLeft: 15,
	paddingRight: 15,
	borderRadius: 3,
	margin: 5
}

const btnText = {
	color: '#fff',
	fontWeight: 'bold'
}