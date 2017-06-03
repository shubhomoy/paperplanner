import React from 'React';
import { View, Image } from 'react-native';
import { ColorScheme } from '../css/style';

export default class Separator_1 extends React.Component {
	render() {
		return(
			<View style={sepStyle} />
		);
	}
}

const sepStyle = {
	width: '100%',
	height: 0.5,
	backgroundColor: '#dedede'
}