import React from 'react';
import { Text, View, TextInput, Button, TouchableNativeFeedback, Image, Dimensions } from 'react-native';
import { ColorScheme, styles } from '../css/style';
import realm from '../database';
import Services from '../utils';
import { Actions } from 'react-native-router-flux';
import AppBar from '../components/AppBar';
import PrimaryButton from '../components/PrimaryButton';
import { BoxShadow } from 'react-native-shadow';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ACTIONS from '../utils/actions';

class NoteActivity extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			noteText: ''
		}
		this.saveNote = this.saveNote.bind(this);
	}

	

	saveNote = () => {
		realm.write(() => {
			let newNote = realm.create('Note', {
				id: Services.getUniqueID(),
				note_text: this.state.noteText,
				created_on: new Date(),
				updated_on: new Date()
			});
			this.props.getNotes();
		});
		Actions.pop();
	}

	render() {
		return (
			<View style = {{flex: 1}}>
				<AppBar title = "Note" backButton = {true}/>
				<View style = {{flex: 1, backgroundColor: '#fff'}}>
					<TextInput 
						multiline = {true} 
						numberOfLines = {10} 
						autoFocus = {true}
						style = {inputStyle}
						autoCapitalize="sentences"
						onChangeText = {(text) => {this.setState({noteText: text})}}
						underlineColorAndroid = 'transparent' 
						placeholder = "Add a note"/>

					<BoxShadow setting = {shadow}>
						<View style = {controlsContainer}>
							<PrimaryButton title = "Save" onPressFunction = {this.saveNote}/>
						</View>
					</BoxShadow>
				</View>
			</View>
		);
	}
}

const inputStyle = {
	fontSize: 20,
	marginLeft: 20,
	marginRight: 20,
	textAlignVertical: 'top',
	flex: 1
}

const controlsContainer = {
	flex: 1,
	backgroundColor: '#fff',
	justifyContent: 'center',
	alignItems: 'flex-end'
}

const shadow = {
	width: Dimensions.get('window').width,
	height: 50,
	color: '#dedede',
	border: 20,
	radius: 25,
	opacity: 0.3,
	x: 0,
	y: 0,
	style:{
		
	}
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

export default connect(mapStateToProps, mapDispatchToProps)(NoteActivity);