import React from 'react';
import { Text, View, TextInput, Button, TouchableNativeFeedback, Image, Dimensions, Alert, BackHandler } from 'react-native';
import { ColorScheme, styles } from '../css/style';
import realm from '../database';
import Services from '../utils';
import { Actions } from 'react-native-router-flux';
import AppBar from '../components/AppBar';
import PrimaryButton from '../components/PrimaryButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';
import _ from 'underscore';


class NoteActivity extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			note: this.props.note,
			noteText: ''
		}
		this.saveNote = this.saveNote.bind(this);
		this.onBack = this.onBack.bind(this);
		this.promptSave = this.promptSave.bind(this);
		this.onSubmitEditing = this.onSubmitEditing.bind(this);
	}

	componentDidMount() {
		if(this.props.action === 'edit') {
			this.setState({noteText: this.state.note.note_text});
		}else if(this.props.action === 'share') {
			this.setState({noteText: this.props.note});
		}
		BackHandler.addEventListener('hardwareBackPressed', this.onBack);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPressed', this.onBack)
	}


	onSubmitEditing = _.debounce(this._onSubmitEditingNote, 100, true);

	_onSubmitEditingNote() {
        const { noteText, cursorPosition } = this.state;
        let newText = noteText;
        const ar = newText.split('');
        ar.splice(cursorPosition.start, 0, '\n');
        newText = ar.join('');

        if(cursorPosition.start === noteText.length) {
        	this.setState({
        		noteText: newText, 	
        	});
        }else{
        	this.setState(
        		{ 
        			noteText: newText, 
        			selection: {
        				start: cursorPosition.start + 1,
        				end: cursorPosition.end + 1
        			}
        		}
        	);
        }
    }

	onBack = () => {
		if(this.props.action === 'new' || this.props.action === 'share') {
			if(this.state.noteText.trim().length > 0) {
				this.promptSave();
			}else{
				Actions.pop();
			}
		}else{
			if(this.state.note.note_text != this.state.noteText && this.state.noteText.trim().length > 0) {
				this.promptSave();
			}else{
				Actions.pop();	
			}
		}
		return true;
	}

	promptSave = () => {
		Alert.alert('Save Note?', 'Do you want to save this note?', [
				{
					text: 'No',
					onPress: () => {
						Actions.pop();
					}
				},
				{
					text: 'Save',
					onPress: () => {
						this.saveNote();
					}
				}
			])
	}

	saveNote = () => {
		if(this.props.action === 'new' || this.props.action === 'share') {
			realm.write(() => {
				let newNote = realm.create('Note', {
					id: Services.getUniqueID(),
					note_text: this.state.noteText,
					created_on: new Date(),
					updated_on: new Date()
				});
			});
		}else{
			let note = realm.objectForPrimaryKey('Note', this.state.note.id);
			realm.write(() => {
				note.note_text = this.state.noteText;
				note.updated_on = new Date();
			});
		}
		this.props.scrollToTop();
		this.props.getNotes();
		Actions.pop();
	}

	render() {
		return (
			<View style = {{flex: 1}}>
				<AppBar title = "Note" backButton = {true} onBackListener = {this.onBack}/>
				<View style = {{flex: 1, backgroundColor: '#fff'}}>
					<TextInput 
						multiline = {true} 
						numberOfLines = {10} 
						autoFocus = {true}
						blurOnSubmit = {false}
						style = {inputStyle}
						selection = {this.state.selection}
						onSelectionChange={(event) => this.setState({ cursorPosition: event.nativeEvent.selection, selection: event.nativeEvent.selection })}
						autoCapitalize="sentences"
						onChangeText = {(text) => {this.setState({noteText: text})}}
						underlineColorAndroid = 'transparent' 
						value = {this.state.noteText}
						onSubmitEditing={this.onSubmitEditing}
						placeholder = "Add a note"/>

					<Image source = {require('../images/shadow.png')} resizeMode = "stretch" style = {{height: 20, width: Dimensions.get('window').width, opacity: 0.2}}/>
					<View style = {controlsContainer}>
						<PrimaryButton title = "Save" onPressFunction = {this.saveNote} color = {ColorScheme.primary}/>
					</View>
				</View>
			</View>
		);
	}
}

const inputStyle = {
	fontSize: 17,
	marginLeft: 20,
	marginRight: 20,
	textAlignVertical: 'top',
	flex: 1
}

const controlsContainer = {
	padding: 10,
	backgroundColor: '#fff',
	justifyContent: 'center',
	alignItems: 'flex-end'
}


function mapStateToProps(state) {
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getNotes: ACTIONS.getNotes,
		scrollToTop: ACTIONS.scrollToTop
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteActivity);