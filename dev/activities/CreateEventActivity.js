import React from 'react';
import { View, Text, TextInput, TouchableNativeFeedback, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {styles, ColorScheme} from '../css/style';
import realm from '../database/schemas';
import moment from 'moment';
import Services from '../utils';
import { Actions, ActionConst } from 'react-native-router-flux';

class CreateEventActivity extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			eventName: '',
			error: false
		}
		this.saveEvent = this.saveEvent.bind(this);
	}

	saveEvent = () => {
		if(!this.state.eventName.trim()) {
			this.setState({error: true});
			return;
		}else{
			this.setState({error: false});
		}
		let event = null;
	  	realm.write(() => {
	  		event = realm.create('Event', {
	  			id: Services.getUniqueID(),
	  			title: this.state.eventName,
	  			created_on: new Date(),
	  			updated_on: new Date()
	  		});
	  	});
	  	Actions.eventActivity({
	  		type: ActionConst.REPLACE,
	  		event: event
	  	});
	}

	render() {
		return(
			<View style = {viewStyle}>
				<Text style = {textStyle}>
					What are you planning for?
				</Text>
				<View style={{flexDirection: 'row'}}>
					<TextInput value = {this.state.eventName} onChangeText = {(text) => this.setState({eventName: text})} style={inputStyle} placeholder = "Event name" autoCapitalize="words" underlineColorAndroid="transparent" autoFocus={true}/>
				</View>
				<Text style = { this.state.error ? showError : hideError }>Oops! You've missed the event name!</Text>
				<TouchableNativeFeedback onPress = {() => this.saveEvent()} background={TouchableNativeFeedback.SelectableBackground()}>
					<View style = {buttonStyle}>
						<Text style = {{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>DONE</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	}
}

const viewStyle = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
};

const inputStyle = {
	width: 250,
	fontSize: 30,
	textAlign: 'center',
	borderWidth: 1,
	borderRadius: 15,
	fontWeight: 'bold'
};

const textStyle = {
	fontSize: 25,
	padding: 20,
	textAlign: 'center'
};

const buttonStyle = {
	padding: 15,
	marginTop: 25,
	paddingLeft: 25,
	paddingRight: 25,
	backgroundColor: ColorScheme.primary,
	borderRadius: 50
};

const showError = {
	color: '#B71C1C',
	fontSize: 15
};

const hideError = {
	display: 'none'
};

export default CreateEventActivity;