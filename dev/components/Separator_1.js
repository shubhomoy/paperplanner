import React from 'React';
import { View, Image } from 'react-native';

export default class Separator_1 extends React.Component {
	render() {
		return(
			<View style={sepStyle}>
				<Image source = {require('../images/link.png')} style = {{width: 50, height: 50, marginLeft: 40}} />
			</View>
		);
	}
}

const sepStyle = {
	width: '100%'
}