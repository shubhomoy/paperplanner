import React from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { ColorScheme, styles } from '../css/style';

export default class SecondaryButton extends React.Component {
	constructor(props) {
		super(props);
		this.renderStyle = this.renderStyle.bind(this);
	}

	renderStyle = () => {
		if(this.props.withBorder) {
			return {
				justifyContent: 'center',
				alignItems: 'center',
				borderWidth: 2,
				borderColor: this.props.color,
				padding: 5,
				paddingLeft: 15,
				paddingRight: 15,
				borderRadius: 3,
				margin: 5
			}
		}else{
			return {
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 5,
				paddingLeft: 15,
				paddingRight: 15,
				borderRadius: 3,
				margin: 5	
			}
		}
	}

	render() {
		const btnText = {
			color: this.props.color,
			fontWeight: 'bold'
		}

		return(
			<TouchableNativeFeedback onPress = {() => this.props.onPressFunction()} background = {TouchableNativeFeedback.SelectableBackground()}>
				<View style = {this.renderStyle()}>
					<Text style = {btnText}>{this.props.title.toUpperCase()}</Text>
				</View>
			</TouchableNativeFeedback>
		);
	}
}