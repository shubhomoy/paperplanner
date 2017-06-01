import React from 'react';
import { View, TouchableNativeFeedback, Text, FlatList, Image } from 'react-native';
import { ColorScheme } from '../css/style';
import moment from 'moment';
import realm from '../database/schemas';
import EventItem from '../components/EventItem';

class MainActivity extends React.Component {

	constructor(props) {
		super(props);
		this.createEvent = this.createEvent.bind(this);
		this.state = {
			events: realm.objects('Event').sorted('updated_on', true)
		}
	}

	componentDidMount() {
		realm.addListener('change', () => {
			if(this.refs.eventList) {
				this.setState({
					events: realm.objects('Event').sorted('updated_on', true)
				});
			}
		});
	}

	static navigationOptions = {
		title: 'Events',
		// header: false
	};

	createEvent = () => {
		const { navigate } = this.props.navigation;
		navigate('CreateEvent');
	};

	render() {	
		return(
			<View style = {viewStyle}>
				<FlatList data = {this.state.events} renderItem = {({item}) => <EventItem event = {item} navigation = {this.props.navigation}/>} keyExtractor={(item, index) => item.id} ListFooterComponent = {listFooter} ref="eventList"/>
				<View style = {{position: 'absolute', flex: 1, bottom: 16, right: 16}}>
					<TouchableNativeFeedback onPress = {() => this.createEvent()} background={TouchableNativeFeedback.SelectableBackground()}>
						<View style = {buttonStyle}>
							<Image source = {require('../images/addEvent.png')} style = {{width: 20, height: 20, marginRight: 10}}/><Text style = {{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>CREATE EVENT</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
		);
	}
}

const listFooter = () => {
	return(
		<View style = {{flex: 1, flexDirection: 'row', height: 70, backgroundColor: '#fff'}}/>
	);
}

const viewStyle = {
	flex: 1
};

const buttonStyle = {
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	padding: 15,
	marginTop: 25,
	paddingLeft: 25,
	paddingRight: 25,
	backgroundColor: ColorScheme.primary,
	borderRadius: 50
};

export default MainActivity;