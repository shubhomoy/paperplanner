import React from 'react';
import moment from 'moment';
import { ColorScheme } from '../css/style';
import { Text, View, TouchableWithoutFeedback, Image, Modal, Button } from 'react-native';

class EventActivity extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			addModalVisible: false
		}
		this.addEntity = this.addEntity.bind(this);
	}

	static navigationOptions = {
		header: false
	}

	addEntity = (entity) => {
		this.setState({
			addModalVisible: false
		});
		this.props.navigation.navigate('Note', {
			event: this.props.navigation.state.params.event
		});
	}

	render() {
		const { state } = this.props.navigation;
		let event = state.params.event;
		return(
			<View style = {{flex: 1}}>
				<Text style = {eventTitleStyle}>{event.title}</Text>
				<View style={dateStyle}>
					<Text style = {{fontWeight: 'bold', fontSize: 15}}>Created on: </Text>
					<Text style = {{fontSize: 15}}>{moment(event.created_on).format('ddd Do MMM YYYY').toString()}</Text>
				</View>
				<View style={dateStyle}>
					<Text style = {{fontWeight: 'bold', fontSize: 15}}>Last updated: </Text>
					<Text style = {{fontSize: 15}}>{moment(event.updated_on).format('ddd Do MMM YYYY').toString()}</Text>
				</View>
				<View style={{position: 'absolute', bottom: 20, right: 20}}>
					<TouchableWithoutFeedback onPress = {() => {this.setState({addModalVisible: true})}}>
						<View style = {buttonStyle}>
							<Image source = {require('../images/addEntity.png')} style = {{width: 20, height: 20, marginRight: 10}}/><Text style = {{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>ADD ENTITY</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>

				<Modal 
					animationType = "slide"
				  	transparent = {false}
					visible = {this.state.addModalVisible}
					onRequestClose = {() => {this.setState({addModalVisible: false})}}>

					<View style = {addEnitityContainer}>
						<Text style = {{fontSize: 28, textAlign: 'center', padding: 30}}>What do you want to add to this event?</Text>
						<TouchableWithoutFeedback onPress = {() => {this.addEntity('Note')}}>
							<View style = {{justifyContent:'center', alignItems: 'center', marginBottom: 30}}>
								<View style = {entityBtn}>
									<Image source = {require('../images/note.png')} style = {entityImg}/>
								</View>
								<Text style = {{fontWeight: 'bold', fontSize: 20, marginTop: 5}}>Note</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback>
							<View style = {{justifyContent:'center', alignItems: 'center', marginBottom: 30}}>
								<View style = {entityBtn}>
									<Image source = {require('../images/todo.png')} style = {entityImg}/>
								</View>
								<Text style = {{fontWeight: 'bold', fontSize: 20, marginTop: 5}}>Tasks</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback>
							<View style = {{justifyContent:'center', alignItems: 'center', marginBottom: 30}}>
								<View style = {entityBtn}>
									<Image source = {require('../images/expense.png')} style = {entityImg}/>
								</View>
								<Text style = {{fontWeight: 'bold', fontSize: 20, marginTop: 5}}>Expense</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress = {() => {this.setState({addModalVisible: false})}}>
							<View style = {{justifyContent:'center', alignItems: 'center', marginBottom: 30}}>
								<Image source = {require('../images/close.png')} style = {{width: 40, height: 40}}/>
								<Text style = {{fontWeight: 'bold', fontSize: 20, marginTop: 5}}>Close</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>

				</Modal>
			</View>
		)
	}
}

const eventTitleStyle = {
	fontSize: 40,
	color: '#212121',
	fontWeight: 'bold',
	padding: 16
}

const dateStyle = {
	flexDirection: 'row', 
	paddingLeft: 16, 
	paddingRight: 16
}

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

const addEnitityContainer = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
}

const entityImg = {
	height: 30,
	width: 30
}

const entityBtn = {
	backgroundColor: ColorScheme.primary,
	padding: 15,
	borderRadius: 100
}

export default EventActivity;
