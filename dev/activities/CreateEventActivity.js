import React from 'react';
import { View, Text, TextInput, TouchableNativeFeedback, Image, Dimensions, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {styles, ColorScheme} from '../css/style';
import realm from '../database';
import moment from 'moment';
import Services from '../utils';
import { BoxShadow } from 'react-native-shadow';
import { Actions, ActionConst } from 'react-native-router-flux';

class CreateEventActivity extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			eventName: '',
			nextShown: false,
			options: ["Plan a Trip", "Throw a Party", "Organize an Event", "Make a Shopping List", "Make Appointment", "Track expense", "Do Homework", ]
		}
		this.saveEvent = this.saveEvent.bind(this);
		this.showNext = this.showNext.bind(this);
		this.renderOptionItem = this.renderOptionItem.bind(this);
	}

	renderOptionItem = (item) => {
		return(
			<TouchableNativeFeedback onPress = {() => {
				this.setState({
					eventName: item,
					nextShown: true
				});
			}}>
				<Text style = {optionsStyle}>{item}</Text>
			</TouchableNativeFeedback>
		);
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

	showNext = () => {
		if(this.state.nextShown) {
			return(
				<TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackgroundBorderless()} onPress = {() => this.saveEvent()}>
					<View style = {{height: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 50}}>
						<Image source = {require('../images/next.png')} style = {{height: 25, width: 25}}/>
					</View>
				</TouchableNativeFeedback>
			);
		}else{
			return null;
		}
	}

	render() {
		return(
			<View style = {viewStyle}>
				<BoxShadow setting = {shadowOpt}>
					<View style = {inputContainer}>
						<TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackgroundBorderless()} onPress = {Actions.pop}>
							<View style = {{height: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 50}}>
								<Image source = {require('../images/cross.png')} style = {{height: 15, width: 15}}/>
							</View>
						</TouchableNativeFeedback>
						<TextInput 
							value = {this.state.eventName} 
							onChangeText = {(text) => {
								if(text && text.trim().length > 0) {
									this.setState({eventName: text, nextShown: true})
								}else{
									this.setState({eventName: text, nextShown: false})
								}
							}} 
							style={inputStyle} 
							placeholder = "I want to..." 
							autoCapitalize="words" 
							underlineColorAndroid="transparent" 
							autoFocus={true}/>
						{this.showNext()}
					</View>
				</BoxShadow>
				<FlatList 
					data = {this.state.options}
					renderItem = {({item}) => this.renderOptionItem(item)}
					keyExtractor = {(item) => item}/>
			</View>
		);
	}
}

const shadowOpt = {
	width: Dimensions.get('window').width,
	height: 60,
	color: '#000',
	border: 10,
	radius: 0,
	opacity: 0.1,
	x: 0,
	y: 0,
	style:{marginVertical:0}
}

const viewStyle = {
	flex: 1,
	backgroundColor: '#fff'
};

const inputContainer = {
	flex: 1,
	alignItems: 'center',
	backgroundColor: '#fff',
	flexDirection: 'row'
}

const inputStyle = {
	flex: 1,
	backgroundColor: '#fff',
	fontSize: 20
};

const optionsStyle = {
	fontSize: 17,
	padding: 20,
	paddingLeft: 50,
	color: '#9E9E9E'
}

export default CreateEventActivity;