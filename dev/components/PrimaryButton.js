import React from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { ColorScheme, styles } from '../css/style';

export default class PrimaryButton extends React.Component {
	render() {
		const container = {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: this.props.color,
			padding: 5,
			paddingLeft: 15,
			paddingRight: 15,
			borderWidth: 1,
			borderColor: this.props.color,
			borderRadius: 3,
			margin: 5
		}
		return(
			<TouchableNativeFeedback onPress = {() => this.props.onPressFunction()} background = {TouchableNativeFeedback.SelectableBackground()}>
				<View style = {container}>
					<Text style = {btnText}>{this.props.title.toUpperCase()}</Text>
				</View>
			</TouchableNativeFeedback>
		);
	}
}

const btnText = {
	color: '#fff',
	fontWeight: 'bold',
	fontSize: 13
}