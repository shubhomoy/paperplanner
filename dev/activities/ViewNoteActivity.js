import React from 'react';
import { View, Text, TouchableNativeFeedback, ScrollView, Dimensions, Alert, TextInput, AsyncStorage, Image } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { ColorScheme, styles } from '../css/style';
import { Actions, ActionConst } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';
import realm from '../database';
import moment from 'moment';
import Constants from '../utils/Constants';

class ViewNoteActivity extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			typedCorrectPassword: false,
			password: '',
			incorrectPassword: false
		}
		this.deleteEntity = this.deleteEntity.bind(this);
		this.editNote = this.editNote.bind(this);
		this.viewLockedNote = this.viewLockedNote.bind(this);
		this.showIncorrectPassword = this.showIncorrectPassword.bind(this);
	}

	viewLockedNote = () => {
		AsyncStorage.getItem(Constants.STORE).then((obj) => {
			if(obj) {
				obj = JSON.parse(obj);
				if(obj.is_password_set) {
					if(this.state.password === obj.password) {
						this.setState({
							typedCorrectPassword: true,
							incorrectPassword: false
						});
					}else{
						this.setState({
							typedCorrectPassword: false,
							incorrectPassword: true
						});
					}
				}
			}else{}
		});
	}

	deleteEntity = () => {
		Alert.alert('Delete Note', 'Are you sure you want to delete?',
			[
				{
					text: 'No'
				},
				{
					text: 'Yes',
					onPress: () => {
						realm.write(() => {
							let note = realm.objectForPrimaryKey('Note', this.props.note.id);
							realm.delete(note);
							this.props.getNotes();
							Actions.pop();
						});
					}
				}
			]
		);
	}

	editNote = () => {
		Actions.noteActivity({
			type: ActionConst.REPLACE,
			note: this.props.note,
			action: 'edit'
		});
	}

	showIncorrectPassword = () => {
		if(this.state.incorrectPassword) {
			return(
				<Text style = {{color: ColorScheme.red}}>Incorrect Password</Text>
			);
		}else{
			return null;
		}
	}

	render() {
		if(this.props.note.is_locked && !this.state.typedCorrectPassword) {
			return(
				<View style = {{flex: 1}}>
					<View style = {{width: '100%', height: 5, backgroundColor: ColorScheme.primary}}/>
					<View style = {{flex: 1, alignItems: 'center'}}>
						<View style = {{alignItems: 'center'}}>
							<Text style = {{color: ColorScheme.primary, fontWeight: 'bold', fontSize: 25, marginTop: 50, textAlign: 'center', marginBottom: 10}}>Note is Locked</Text>
							<Text style = {{color: '#212121', fontSize: 15, textAlign: 'center', width: Dimensions.get('window').width/2, marginBottom: 30}}>Enter password to view the note</Text>
							
								<TextInput 
									onChangeText = {(text) => {
										this.setState({password: text})
									}}
									style = {inputStyle}
									maxLength = {20}
									underlineColorAndroid = 'transparent'
									secureTextEntry = {true}
									placeholder = "Enter Password"/>

							{this.showIncorrectPassword()}
							<View style = {{flexDirection: 'row'}}>
								<SecondaryButton title = "Dismiss" onPressFunction = {Actions.pop} withBorder = {true} color = {ColorScheme.text}/>
								<PrimaryButton title = "View Note" color = {ColorScheme.primary} onPressFunction = {this.viewLockedNote}/>
							</View>
						</View>
					</View>
				</View>
			);
		}else{
			return(
				<View style = {{flex: 1}}>
					<ScrollView>
						<View style = {{flexDirection: 'row', marginTop: 20}}>
							<Text style = {dateTitleStyle}>Created on:</Text>
							<Text style = {dateStyle}>{moment(this.props.note.created_on).format('ddd Do MMM YYYY').toString()}</Text>
						</View>
						<View style = {{flexDirection: 'row'}}>
							<Text style={dateTitleStyle}>Last updated:</Text>
							<Text style = {dateStyle}>{moment(this.props.note.updated_on).format('ddd Do MMM YYYY').toString()}</Text>
						</View>
						<Text style = {textStyle} selectable = {true}>
							{this.props.note.note_text}
						</Text>
					</ScrollView>
						<Image source = {require('../images/shadow.png')} resizeMode = "stretch" style = {{height: 20, width: Dimensions.get('window').width, opacity: 0.2}}/>
						<View style = {controlsContainer}>
							<SecondaryButton title = "Delete" withBorder = {true} color = {ColorScheme.redDark} onPressFunction = {this.deleteEntity}/>
							<PrimaryButton title = "Edit" onPressFunction = {this.editNote} color = {ColorScheme.primary}/>
						</View>
				</View>
			);
		}
	}
}

const dateTitleStyle = {
	fontWeight: 'bold',
	paddingLeft: 20,
	fontSize: 13
}

const dateStyle = {
	paddingLeft: 10
}

const textStyle = {
	fontSize: 17,
	color: '#212121',
	padding: 20
}

const controlsContainer = {
	flexDirection: 'row',
	padding: 10,
	backgroundColor: '#fff',
	justifyContent: 'flex-end',
	alignItems: 'center'
}


const inputStyle = {
	textAlign: 'center',
	fontSize: 17,
	borderRadius: 5,
	backgroundColor: '#fff',
	width: Dimensions.get('window').width/1.5,
	borderWidth: 0.5
}

function mapStateToProps(state) {
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getNotes: ACTIONS.getNotes
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewNoteActivity);