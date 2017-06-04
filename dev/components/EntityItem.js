import React from 'react';
import moment from 'moment';
import { Text, View, Image, TouchableNativeFeedback, Alert, TouchableHighlight, Clipboard, Share, AsyncStorage, TextInput, Dimensions } from 'react-native';
import { ColorScheme } from '../css/style';
import realm from '../database';
import ImageButton from './ImageButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';
import { Actions } from 'react-native-router-flux';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

class EntityItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLocked: this.props.note.is_locked,
			titleSetup: false,
			title: this.props.note.title,
			unlockSetup: false,
			typedPassword: '',
			incorrectTypedPassword: false
		}
		this.lockNote = this.lockNote.bind(this);
		this.unlockNote = this.unlockNote.bind(this);
		this.deleteEntity = this.deleteEntity.bind(this);
		this.openNote = this.openNote.bind(this);
		this.copyNote = this.copyNote.bind(this);
		this.shareNote = this.shareNote.bind(this);
		this.handleLock = this.handleLock.bind(this);
		this.renderLock = this.renderLock.bind(this);
		this.showIncorrectPassword = this.showIncorrectPassword.bind(this);
	}

	unlockNote = () => {
		AsyncStorage.getItem('paperStore').then((obj) => {
			if(obj) {
				obj = JSON.parse(obj);
				if(obj.is_password_set) {
					if(this.state.typedPassword === obj.password) {
						realm.write(() => {
							this.props.note.is_locked = false,
							this.props.note.title = ''
						});
						this.setState({
							isLocked: false,
							unlockSetup: false,
							incorrectTypedPassword: false
						});
					}else{
						this.setState({
							incorrectTypedPassword: true
						})
					}		
				}
			}
		});
	}

	lockNote = () => {
		realm.write(() => {
			this.props.note.is_locked = true,
			this.props.note.title = this.state.title
		});
		this.setState({
			isLocked: true,
			titleSetup: false,
			incorrectTypedPassword: false
		});
	}

	handleLock = () => {
		if(this.props.note.is_locked) {
			this.setState({
				unlockSetup: true,
				incorrectTypedPassword: false
			})
		}else{
			AsyncStorage.getItem('paperStore').then((obj) => {
				if(obj) {
					obj = JSON.parse(obj);
					if(obj.is_password_set) {
						this.setState({
							titleSetup: true,
							incorrectTypedPassword: false
						});
					}
				}else{
					Alert.alert('Setup Password', 'First setup a passcode to lock your notes', [
						{
							text: 'Later'	
						},
						{
							text: 'Set password',
							onPress: () => {
								Actions.createPasswordActivity();
							}
						}
					])
				}
			});
		}
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
						});
					}
				}
			]
		);
	}

	copyNote = () => {
		Clipboard.setString(this.props.note.note_text);
	}

	openNote = () => {
		Actions.viewNoteActivity({
			note: this.props.note
		});
	}

	shareNote = () => {
		Share.share({
			message: this.props.note.note_text
		});
	}

	renderLock = () => {
		if(this.state.isLocked) {
			return <ImageButton onPressFunction={this.handleLock} image = {require('../images/locked.png')}/>
		}else
			return <ImageButton onPressFunction={this.handleLock} image = {require('../images/key.png')}/>
	}

	showIncorrectPassword = () => {
		if(this.state.incorrectTypedPassword) {
			return <Text style = {{fontSize: 17, color: ColorScheme.red, paddingLeft: 20, paddingRight: 20}}>Incorrect password!</Text>
		}else{
			return null;
		}
	}

	render() {
		if(this.state.titleSetup) {
			return(
				<View style = {[itemStyle, {justifyContent: 'center', alignItems: 'center'}]}>
					<Text style = {{fontSize: 17, color: ColorScheme.text, paddingLeft: 20, paddingRight: 20}}>Provide a title for this note</Text>
					<TextInput 
						onChangeText = {(text) => this.setState({title: text})}
						underlineColorAndroid = 'transparent'
						style = {{width: Dimensions.get('window').width/2, textAlign: 'center', fontSize: 20, borderWidth: 0.5, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, marginTop: 10, borderRadius: 3}}
						placeholder = "Enter title"/>
					<View style = {{flexDirection: 'row'}}>
						<SecondaryButton title = "Dismiss" color = {ColorScheme.text} withBorder = {true} onPressFunction = {() => {this.setState({titleSetup: false})}}/>
						<PrimaryButton title = "Done" color = {ColorScheme.primary} onPressFunction = {this.lockNote}/>
					</View>
				</View>
			);
		}else if(this.state.unlockSetup) {
			return(
				<View style = {[itemStyle, {justifyContent: 'center', alignItems: 'center'}]}>
					<Text style = {{fontSize: 17, color: ColorScheme.text, paddingLeft: 20, paddingRight: 20}}>Enter password to unlock this note</Text>
					<TextInput 
						secureTextEntry = {true}
						underlineColorAndroid = 'transparent'
						onChangeText = {(text) => this.setState({typedPassword: text})}
						style = {{width: Dimensions.get('window').width/2, textAlign: 'center', fontSize: 20, borderWidth: 0.5, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, marginTop: 10, borderRadius: 3}}
						placeholder = "Enter password"/>
					{this.showIncorrectPassword()}
					<View style = {{flexDirection: 'row'}}>
						<SecondaryButton title = "Dismiss" color = {ColorScheme.text} withBorder = {true} onPressFunction = {() => {this.setState({unlockSetup: false})}}/>
						<PrimaryButton title = "Unlock" color = {ColorScheme.primary} onPressFunction = {this.unlockNote}/>
					</View>
				</View>
			)
		}else{
			return(
				<TouchableHighlight onPress = {() => this.openNote()} activeOpacity = {0.98} underlayColor = {ColorScheme.primary}>
					<View style = {itemStyle}>
						<Text style = {itemTextStyle} ellipsizeMode = "tail" numberOfLines = {10}>{this.state.isLocked ? this.props.note.title : this.props.note.note_text}</Text>	
						<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
							{this.renderLock()}
							<View style = {{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flex: 1}}> 
								<ImageButton onPressFunction={this.props.note.is_locked ? () => {} : this.deleteEntity} image = {require('../images/remove.png')}/>
								<ImageButton onPressFunction={this.props.note.is_locked ? () => {} : this.copyNote} image = {require('../images/copy.png')}/>
								<ImageButton onPressFunction={this.props.note.is_locked ? () => {} : this.shareNote} image = {require('../images/share.png')}/>
							</View>
						</View>
					</View>
				</TouchableHighlight>
			);
		}
	}
}

const switchStyle = {
}

const itemStyle = {
	flex: 1,
	backgroundColor: '#fff',
	paddingLeft: 25,
	paddingRight: 25,
	paddingTop: 20,
	paddingBottom: 20
}

const itemTextStyle = {
	fontSize: 20,
	color: '#212121',
	flex: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(EntityItem);