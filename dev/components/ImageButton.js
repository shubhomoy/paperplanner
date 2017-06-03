import React from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { ColorScheme, styles } from '../css/style';

export default class PrimaryButton extends React.Component {
	render() {
		return(
			<TouchableNativeFeedback onPress = {() => this.props.onPressFunction()} background = {TouchableNativeFeedback.SelectableBackgroundBorderless()}>
				<View style = {container}>
					<Image source = {this.props.image} style = {{height: 20, width: 20}}/>
				</View>
			</TouchableNativeFeedback>
		);
	}
}

const container = {
	justifyContent: 'center',
	alignItems: 'center',
	padding: 5,
	margin: 5
}