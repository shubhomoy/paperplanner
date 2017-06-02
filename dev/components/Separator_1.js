import React from 'React';
import { View, Image } from 'react-native';
import { ColorScheme } from '../css/style';

export default class Separator_1 extends React.Component {
	render() {
		return(
			<View style={sepStyle}>
				
			</View>
		);
	}
}

const sepStyle = {
	width: 2.5,
	height: 50,
	borderBottomLeftRadius: 2.5,
	borderBottomRightRadius: 2.5,
	marginLeft: 23.75,
	backgroundColor: ColorScheme.primary
}