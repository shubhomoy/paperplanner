import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import moment from 'moment';
import realm from '../database/schemas';

class EventItem extends React.Component {

	constructor(props) {
		super(props);
		this.openEvent = this.openEvent.bind(this);
	}

	openEvent = (event) => {
		let { navigate } = this.props.navigation;
		navigate('Event', {event: event});
		// realm.write(() => {
		// 	realm.delete(realm.objectForPrimaryKey('Event', id));	
		// });	
	}

	render() {
		return(
			<TouchableHighlight style = {itemStyle} onPress = {() => this.openEvent(this.props.event)}>
				<View style = {{flex: 1, flexDirection: 'row'}}>
					<View style = {{flex: 1, alignItems: 'flex-start'}}>
						<Text style = {titleStyle}>{this.props.event.title}</Text>
					</View>
					<View style = {{flex: 1, alignItems: 'flex-end'}}>
						<Text style = {dateStyle}>Last updated</Text>
						<Text style = {dateStyle}>{moment(this.props.event.updated_on).format('ddd Do MMM YYYY').toString()}</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

const itemStyle = {
	backgroundColor: '#fff',
	padding: 16,
	marginBottom: 1
}

const titleStyle = {
	fontSize: 20,
	fontWeight: 'bold'
}

const dateStyle = {
	fontSize: 12,
	textAlign: 'right'
}

export default EventItem;