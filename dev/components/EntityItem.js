import React from 'react';
import moment from 'moment';
import { Text, View, Image, TouchableNativeFeedback, Alert, Animated, TouchableHighlight, Clipboard, Share, AsyncStorage, TextInput, Dimensions } from 'react-native';
import { ColorScheme } from '../css/style';
import realm from '../database';
import ImageButton from './ImageButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';
import { Actions } from 'react-native-router-flux';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import Constants from '../utils/Constants';
import Checkbox from './Checkbox';

class EntityItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLocked: this.props.note.is_locked,
			titleSetup: false,
			title: this.props.note.title,
			unlockSetup: false,
			typedPassword: '',
			errorText: '',
			copyAnim: new Animated.Value(0),
			deleteAnim: new Animated.Value()
		}
		this.lockNote = this.lockNote.bind(this);
		this.unlockNote = this.unlockNote.bind(this);
		this.deleteEntity = this.deleteEntity.bind(this);
		this.openNote = this.openNote.bind(this);
		this.copyNote = this.copyNote.bind(this);
		this.shareNote = this.shareNote.bind(this);
		this.handleLock = this.handleLock.bind(this);
		this.renderLock = this.renderLock.bind(this);
		this.showError = this.showError.bind(this);
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
							title: '',
							typedPassword: '',
							errorText: ''
						});
					}else{
						this.setState({
							errorText: 'Incorrect Password!'
						})
					}		
				}
			}else{
				this.setState({
					errorText: 'Setup a password first'
				})
			}
		});
	}

	lockNote = () => {
		if(this.state.title.trim().length > 0) {
			realm.write(() => {
				this.props.note.is_locked = true,
				this.props.note.title = this.state.title
			});
			this.setState({
				isLocked: true,
				titleSetup: false,
				title: '',
				typedPassword: '',
				errorText: ''
			});
		}else{
			this.setState({
				errorText: 'Enter title'
			})
		}
	}

	handleLock = () => {
		if(this.props.note.is_locked) {
			this.setState({
				unlockSetup: true,
				incorrectTypedPassword: false
			})
		}else{
			AsyncStorage.getItem(Constants.STORE).then((obj) => {
				if(obj) {
					obj = JSON.parse(obj);
					if(obj.is_password_set) {
						this.setState({
							titleSetup: true,
							incorrectTypedPassword: false
						});
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
						this.props.unmark(this.props.note.id);
						this.state.deleteAnim.setValue(this.state.minHeight);
						Animated.timing(this.state.deleteAnim, {
							toValue: 0
						}).start(() => {
							realm.write(() => {
								let note = realm.objectForPrimaryKey('Note', this.props.note.id);
								realm.delete(note);
								this.props.getNotes();
							});
						});
					}
				}
			]
		);
	}

	contract = (finalValue) => {
		Animated.timing(this.state.copyAnim, {
			toValue: finalValue,
			delay: 2000
		}).start();	
	}

	expand = (finalValue) => {
		Animated.timing(this.state.copyAnim, {
			toValue: finalValue
		}).start(() => this.contract(0));	
	}

	copyNote = () => {
		this.expand(20);
		Clipboard.setString(this.props.note.note_text);
	}

	openNote = () => {
		if(this.props.note.is_locked) {
			AsyncStorage.getItem(Constants.STORE).then((obj) => {
				obj = JSON.parse(obj);
				if(obj.is_password_set) {
					Actions.viewNoteActivity({
						note: this.props.note
					});	
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
					]);			
				}
			}).done();
			
		}else{
			Actions.viewNoteActivity({
				note: this.props.note
			});	
		}
		
	}

	_setMinHeight(event){
    	this.setState({
        	minHeight   : event.nativeEvent.layout.height
    	});
	}

	shareNote = () => {
		Share.share({
			message: this.props.note.note_text
		});
	}

	renderLock = () => {
		if(this.state.isLocked) {
			return <ImageButton onPressFunction={this.handleLock} image = {require('../images/locked.png')} style = {{marginLeft: 0, paddingLeft: 0}}/>
		}else
			return <ImageButton onPressFunction={this.handleLock} image = {require('../images/key.png')} style = {{marginLeft: 0, paddingLeft: 0}}/>
	}

	showError = () => {
		if(this.state.errorText.trim().length > 0) {
			return <Text style = {{fontSize: 17, color: ColorScheme.red, paddingLeft: 20, paddingRight: 20}}>{this.state.errorText}</Text>
		}else{
			return null;
		}
	}

	showCheckbox = () => {
		if(this.props.multiple) {
			return <Checkbox item = {this.props.note} />
		}else{
			return null;
		}
	}

	render() {
		if(this.state.titleSetup) {
			return(
				<View style = {[itemStyle, {justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}]}>
					<Text style = {{fontSize: 17, color: ColorScheme.text, paddingLeft: 20, paddingRight: 20}}>Provide a title for this note</Text>
					<TextInput 
						onChangeText = {(text) => this.setState({title: text})}
						underlineColorAndroid = 'transparent'
						maxLength = {50}
						autoCapitalize="words"
						style = {{width: Dimensions.get('window').width/2, textAlign: 'center', fontSize: 20, borderWidth: 0.5, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, marginTop: 10, borderRadius: 3}}
						placeholder = "Enter title"/>
					{this.showError()}
					<View style = {{flexDirection: 'row'}}>
						<SecondaryButton title = "Dismiss" color = {ColorScheme.text} withBorder = {true} onPressFunction = {() => {this.setState({titleSetup: false, errorText: ''})}}/>
						<PrimaryButton title = "Done" color = {ColorScheme.primary} onPressFunction = {this.lockNote}/>
					</View>
				</View>
			);
		}else if(this.state.unlockSetup) {
			return(
				<View style = {[itemStyle, {justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}]}>
					<Text style = {{fontSize: 17, color: ColorScheme.text, paddingLeft: 20, paddingRight: 20}}>Enter password to unlock this note</Text>
					<TextInput 
						secureTextEntry = {true}
						underlineColorAndroid = 'transparent'
						onChangeText = {(text) => this.setState({typedPassword: text})}
						style = {{width: Dimensions.get('window').width/2, textAlign: 'center', fontSize: 20, borderWidth: 0.5, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, marginTop: 10, borderRadius: 3}}
						placeholder = "Enter password"/>
					{this.showError()}
					<View style = {{flexDirection: 'row'}}>
						<SecondaryButton title = "Dismiss" color = {ColorScheme.text} withBorder = {true} onPressFunction = {() => {this.setState({unlockSetup: false, errorText: ''})}}/>
						<PrimaryButton title = "Unlock" color = {ColorScheme.primary} onPressFunction = {this.unlockNote}/>
					</View>
				</View>
			)
		}else if(this.state.isLocked) {
			return(
				<View>
					<TouchableHighlight onPress = {() => this.openNote()} activeOpacity = {0.98} underlayColor = {ColorScheme.primary}>
						<View style = {[itemStyle, {flexDirection: 'column'}]}>
							<View style = {{flexDirection: 'row', alignItems: 'center'}}>
								{this.renderLock()}
								<Text style = {[itemTextStyle, {fontWeight: 'bold'}]} ellipsizeMode = "tail" numberOfLines = {10}>{this.props.note.title}</Text>	
							</View>
							<View style = {{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10}}>
								<SecondaryButton title = "Unlock" color = {ColorScheme.deepYellow} withBorder = {true} onPressFunction = {this.handleLock}/>
							</View>
						</View>
					</TouchableHighlight>
				</View>
			);
		}else{
			return(
				<TouchableHighlight ref = "item" onPress = {() => this.openNote()} activeOpacity = {0.98} underlayColor = {ColorScheme.primary} onLongPress = {() => this.props.multipleOpen()}>
					<Animated.View onLayout={this._setMinHeight.bind(this)} style = {{height: this.state.deleteAnim}}>
						<View style = {itemStyle}>
							{this.showCheckbox()}
							<View style = {{flex: 1}}>
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
						</View>
						<Animated.View style= {[{backgroundColor: ColorScheme.primary, height: 0, justifyContent: 'center', alignItems: 'center'}, {height: this.state.copyAnim}]}>
							<Text style = {{color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>Note Copied</Text>
						</Animated.View>
					</Animated.View>
				</TouchableHighlight>
			);
		}
	}
}

const switchStyle = {
}

const itemStyle = {
	flex: 1,
	flexDirection: 'row',
	backgroundColor: '#fff',
	paddingLeft: 25,
	paddingRight: 25,
	paddingTop: 20,
	paddingBottom: 20
}

const itemTextStyle = {
	fontSize: 17,
	color: '#212121',
	flex: 1
}

function mapStateToProps(state) {
	return {
		multiple: state.app.multiple
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getNotes: ACTIONS.getNotes,
		multipleOpen: ACTIONS.multipleOpen,
		unmark: ACTIONS.unmark
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityItem);