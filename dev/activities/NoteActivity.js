import React from 'react';
import { Text, View } from 'react-native';

export default class NoteActivity extends React.Component {
	render() {
		return (
			<View>
				<Text>{this.props.navigation.state.params.event.title}</Text>
			</View>
		);
	}
}