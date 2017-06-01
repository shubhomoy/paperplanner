import React from 'react';
import { Text, View, Image } from 'react-native';

export default class EntityItem extends React.Component {
	render() {
		return(
			<View style = {itemStyle}>
				<View style = {{flex: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
					<Image source = {require('../images/note_dark.png')} style = {{width: 20, height: 20}}/>
					<Text style = {titleStyle}>Added a note</Text>
				</View>
				<View style = {{width: '100%', height: 1, backgroundColor: '#dedede'}}/>
				<Text style = {itemTextStyle}>{this.props.text}</Text>
			</View>
		);
	}
}

const itemStyle = {
	backgroundColor: '#fff',
	marginLeft: 20,
	marginRight: 20,
	padding: 10,
	borderRadius: 10
}

const itemTextStyle = {
	fontSize: 20,
	padding: 10
}

const titleStyle = {
	fontWeight: 'bold',
	fontSize: 22,
	color: '#212121',
	paddingLeft: 10,
	paddingRight: 10
}